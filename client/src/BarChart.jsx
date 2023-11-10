import { Bar } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { useState, useEffect } from "react";
import URL from "./URL";
// eslint-disable-next-line react/prop-types
export default function BarChart({ month }) {
  const [priceRangeData, setPriceRangeData] = useState([]);
  const [pricebound, setpricebound] = useState([]);

  useEffect(() => {
    fetch(`${URL}barchart?month=${month}`)
      .then((response) => response.json())
      .then((data) => {
        setPriceRangeData(data.priceRangeData);
        setpricebound(data.pricebound);
        console.log(data);
      });
  }, [month]);

  return (
    <div style={{ width: "600px" }}>
      <Bar
        data={{
          labels: priceRangeData,
          datasets: [
            {
              label: `No of sold Items in ${month} in Given Price ranges `,
              data: pricebound,
              backgroundColor: [
                "#4CAF50", // Green
                "#2196F3", // Blue
                "#FFC107", // Yellow
                "#FF5722", // Orange
                "#9C27B0", // Purple
                "#E91E63", // Pink
                "#795548", // Brown
                "#607D8B" // Gray
              ]
            }
          ]
        }}
      />
    </div>
  );
}
