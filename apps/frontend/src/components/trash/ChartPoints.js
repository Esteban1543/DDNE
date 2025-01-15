import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const enero = [34, 40, 48, 25];
const febrero = [28, 48, 40, 19];

const data = {
  labels: ['Insumos', 'Medianos', 'Jumbos', 'Producción'],
  datasets: [
    {
      label: 'Enero',
      data: enero,
      fill: false,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
    },
    {
      label: 'Febrero',
      data: febrero,
      fill: false,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
    },
  ],
};

const options = {
  responsive: true,
  animation: true,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    // y: {
    //   min: 0,
    //   max: 100
    // },
    x: {
      ticks: { color: 'rgba(0, 0, 0)' }
    }
  },
};

export default function ChartPoints() {
  return <Line data={data} options={options} />
};