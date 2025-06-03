// app/components/dashboard.tsx
"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [forecastData, setForecastData] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/forecast")
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
      <div className="bg-white pl-10 pr-10 pb-55 pt-5 rounded-lg shadow-md">
        <div className="sticky justify-baseline bg-white z-10 pb-4">
          <h2 className="text-2xl text-blue-400 font-bold">Predicted spending</h2>
        </div>
        {loading ? (
          <p>ENTERTAINMENT  : NOT ENOUGH DATA
            FOOD &BEVERAGE  : NOT ENOUGH DATA
            HEALTH          : NOT ENOUGH DATA
            OTHER           : NOT ENOUGH DATA
            ENTERTAINMENT   : NOT ENOUGH DATA
            UTILITIES       : NOT ENOUGH DATA

          </p>
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
