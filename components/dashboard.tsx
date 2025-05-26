// app/components/dashboard.tsx
"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [forecastData, setForecastData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8001/forecast")
      .then((res) => res.json())
      .then((data) => {
        setForecastData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching forecast:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div>rawr</div>

      <div className="bg-white p-6 rounded shadow mt-6">
        <h2 className="text-2xl text-blue-400 font-bold mb-4">Predicted spending</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="text-black space-y-2">
            {Object.entries(forecastData).map(([category, value]) => (
              <li key={category}>
                <span className="font-semibold">{category.toUpperCase()} : </span> {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
