'use client';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data, title }) {
  // Memformat data untuk chart
  const chartData = {
    labels: data.map(item => item[Object.keys(item)[0]]), // Mengambil label (gender/locationType/digitalInterest)
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#36A2EB',
        ],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <div className="w-full max-w-sm p-4 bg-white rounded-lg shadow-md">
      <Pie data={chartData} options={options} />
    </div>
  );
}
