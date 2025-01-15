import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const data = {
  labels: ['Usuarios', 'Clientes', 'Proveedores'],
  datasets: [
    {
      label: 'Activos',
      data: [3, 2, 3],
      borderColor: 'rgba(95, 158, 160, 0.6)',
      backgroundColor: 'cornflowerblue',
      borderWidth: 2,
      // barThickness: 18,
      borderRadius: 4,
      
    },
    {
      label: 'Inactivos',
      data: [2, 1, 1],
      borderColor: 'cornflowerblue',
      backgroundColor: 'rgba(95, 158, 160, 0.3)',
      borderWidth: 1,
      // barThickness: 18,
      borderRadius: 4,
    },
  ],
};


const options = {
  scales: {
    xAxes: [{
      ticks: {
        beginAtZero: true,
      },
    }],
  }
};

const HorizontalBarChart = () => (
  <div>
    {/* <h2>Personas en el Sistema</h2> */}
    <Bar
      data={data}
      options={options}
      width={530}
      height={250}
    />
  </div>
);

export default HorizontalBarChart;
