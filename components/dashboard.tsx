"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [forecastData, setForecastData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForecastData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:8000/forecast");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setForecastData(data);
    } catch (err) {
      console.error("Error fetching forecast:", err);
      setError("Failed to load forecast data");
      // Set default categories with "NOT ENOUGH DATA" when there's an error
      setForecastData({
        "ENTERTAINMENT": "NOT ENOUGH DATA",
        "FOOD & BEVERAGE": "NOT ENOUGH DATA",
        "HEALTH": "NOT ENOUGH DATA",
        "OTHER": "NOT ENOUGH DATA",
        "UTILITIES": "NOT ENOUGH DATA"
      });
    } finally {
      setLoading(false);
    }
  };

const triggerUpdate = async () => {
    try {
      setUpdating(true);
      setError(null);
      const response = await fetch("http://localhost:8000/trigger-update", {
        method: "POST",
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      if (result.status === "success") {
        setForecastData(result.data);
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Error triggering update:", err);
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchForecastData();
  }, []);

  // Default categories to display even when loading or error occurs
  const categories = [
    "ENTERTAINMENT",
    "FOOD & BEVERAGE",
    "HEALTH",
    "OTHER",
    "UTILITIES"
  ];

  return (
    <div>
      <div className="bg-white pl-10 pr-10 pb-5 pt-5 rounded-lg shadow-md">
        <div className="sticky justify-between items-center bg-white z-10 pb-4 flex gap-10">
          <h2 className="text-2xl text-blue-400 font-bold">Predicted spending</h2>
          <button
            onClick={triggerUpdate}
            disabled={updating}
            className={`px-4 py-2 rounded-md text-white font-medium ${
              updating ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {updating ? "Updating..." : "Refresh Forecast"}
          </button>
          {/* <button 
            onClick={runPythonScript}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            {updating ? "Running..." : "Run main.py"}
          </button> */}
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <ul className="text-black space-y-2">
          {loading ? (
            categories.map((category) => (
              <li key={category} className="flex justify-between">
                <span className="font-semibold">{category}</span>
                <span>Loading...</span>
              </li>
            ))
          ) : (
            Object.entries(forecastData).map(([category, value]) => (
              <li key={category} className="flex justify-between">
                <span className="font-semibold">{category.toUpperCase()}</span>
                <span>{value}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}