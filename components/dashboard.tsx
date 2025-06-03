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

  // const categorySpending = {
    // 'Food & Beverages': 0,
    // 'Transportation': 0,
    // 'Utilities': 0,
    // 'Entertainment': 0,
    // 'Healthcare': 0,
    // 'Other Expense': 0
  // };

  const spendingData = {
    labels: Object.keys(forecastData),
    datasets: [
      {
        data: Object.values(forecastData).map(amount => amount),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#4BC0C0', 
          '#9966FF', '#FF9F40', '#C9CBCF'
        ],
        borderWidth: 0,
      }
    ]
  };

  // const categoryColors = {
  //   'Food' : 0,
  //   'Transportation': 0,
  //   'Utilities': 0,
  //   'Entertainment': 0,
  //   'Healthcare': 0,
  //   'Other': 0};


  // spendingData.labels.forEach((label, index) => {
  //   categoryColors[label] = spendingData.datasets[0].backgroundColor[index];
  // });

  return (
    <div>
      <div className="bg-white pl-10 pr-10 pb-5 pt-5 rounded-lg shadow-md">
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
// // app/components/dashboard.tsx
// "use client";

// import { useEffect, useState } from "react";

// // Define consistent colors for each category (make sure these are valid)
// const CATEGORY_COLORS: { [key: string]: string } = {
//   'Food': '#FF6384',
//   'Transport': '#36A2EB',
//   'Utilities': '#4BC0C0', 
//   'Entertainment': '#9966FF',
//   'Healthcare': '#FF9F40',
//   'Other': '#C9CBCF'
// };

// export default function Dashboard() {
//   const [forecastData, setForecastData] = useState<{ [key: string]: string }>({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("http://localhost:8000/forecast")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Received data:", data); // Debug log
//         setForecastData(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching forecast:", err);
//         setLoading(false);
//       });
//   }, []);

//   // Debug: Log the current forecast data
//   useEffect(() => {
//     console.log("Current forecastData:", forecastData);
//   }, [forecastData]);

//   return (
//     <div>
//       <div className="bg-white pl-10 pr-10 pb-55 pt-5 rounded-lg shadow-md">
//         <div className="sticky justify-baseline bg-white z-10 pb-4">
//           <h2 className="text-2xl text-blue-400 font-bold">Predicted spending</h2>
//         </div>
        
//         {loading ? (
//           <ul className="text-black space-y-2">
//             {Object.keys(CATEGORY_COLORS).map((category) => (
//               <li key={category} className="flex items-center">
//                 <div 
//                   className="w-4 h-4 rounded-full mr-2 flex-shrink-0" 
//                   style={{ 
//                     backgroundColor: CATEGORY_COLORS[category],
//                     border: '1px solid #e2e8f0' // Add border for visibility
//                   }}
//                 />
//                 <div>
//                   <span className="font-semibold">{category.toUpperCase()}: </span> 
//                   NOT ENOUGH DATA
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <ul className="text-black space-y-2">
//             {Object.entries(forecastData).map(([category, value]) => {
//               // Debug: Log each category being rendered
//               console.log(`Rendering category: ${category} with color: ${CATEGORY_COLORS[category]}`);
              
//               return (
//                 <li key={category} className="flex items-center">
//                   <div 
//                     className="w-4 h-4 rounded-full mr-2 flex-shrink-0" 
//                     style={{ 
//                       backgroundColor: CATEGORY_COLORS[category] || '#CCCCCC',
//                       border: '1px solid #e2e8f0' // Add border for visibility
//                     }}
//                   />
//                   <div>
//                     <span className="font-semibold">{category.toUpperCase()}: </span> 
//                     {value}
//                   </div>
//                 </li>
//               );
//             })}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// }