'use client';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function PieChart({ data, title }) {
  // Hitung total untuk persentase
  const total = data.reduce((sum, item) => sum + item.count, 0);
  
  const chartData = {
    labels: data.map(item => {
      const percentage = ((item.count / total) * 100).toFixed(1);
      const label = item[Object.keys(item)[0]];
      const count = item.count.toLocaleString('id-ID');
      return `${label} (${count} - ${percentage}%)`;
    }),
    datasets: [{
      data: data.map(item => item.count),
      backgroundColor: [
        '#4299E1', // blue
        '#48BB78', // green
        '#F6AD55', // orange
        '#F687B3', // pink
        '#9F7AEA', // purple
        '#FC8181', // red
        '#4FD1C5', // teal
        '#667EEA'  // indigo
      ]
    }]
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          usePointStyle: true,
          font: { size: 11 },
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            return chart.data.labels.map((label, i) => ({
              text: label,
              fillStyle: datasets[0].backgroundColor[i],
              hidden: false,
              lineCap: 'butt',
              lineDash: [],
              lineDashOffset: 0,
              lineJoin: 'miter',
              lineWidth: 1,
              strokeStyle: datasets[0].backgroundColor[i],
              pointStyle: 'circle',
              datasetIndex: 0,
              index: i
            }));
          }
        }
      },
      title: {
        display: true,
        text: title,
        font: { size: 16, weight: 'bold' },
        padding: 20
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `Total: ${value.toLocaleString('id-ID')} (${percentage}%)`;
          }
        }
      }
    },
    maintainAspectRatio: false
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-md">
      <div className="h-[300px]">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
}
