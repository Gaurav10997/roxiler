import { Pie } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
// eslint-disable-next-line react/prop-types
export default function PieChart({ categoryStats }) {
  return (
    <div style={{ width: "300px" }}>
      <Pie
        data={{
          // eslint-disable-next-line react/prop-types
          labels: categoryStats.map((el) => el._id),
          datasets: [
            {
              label: "No of sold Items in June in Given Price ranges ",
              // eslint-disable-next-line react/prop-types
              data: categoryStats.map((el) => el.count),
              backgroundColor: [
                "#4CAF50", // Green
                "#2196F3", // Blue
                "#FFC107", // Yellow
                "#FF5722", // Orange
                "#9C27B0", // Purple
                "#E91E63", // Pink
                "#795548", // Brown
                "#607D8B" // Gray
                // Add more colors as needed
              ]
            }
          ]
        }}
      />
    </div>
  );
}
