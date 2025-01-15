import React, { useEffect, useState } from 'react'

// Componentes 🎗️
import { URI } from '../../config.js'
import consultaGetBackend from '../../helpers/consultaGetBackend.js';

//🔸 Importación y Registro de Componentes para Gráficos

import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJs,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  LinearScale,
} from 'chart.js'
ChartJs.register(
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  LinearScale,
)

// Colores Grafico ✨
const colores_barras = [
  'rgba(100, 148, 237, 0.65)', //cornflowerblue
  'rgb(4, 165, 186, 0.4)', //verde azulado
  'rgba(54, 162, 235, 0.5)', // Azul claro
  'rgb(16, 58, 136, 0.5)',
  // 'rgba(65, 105, 225, 0.5)', // Azul real
  // 'rgba(0, 191, 255, 0.4)', // Azul profundo
]

function HomeCharts() {

  // 🔸 Solicitud de Datos para Gráficos
  const [produccion, setproduccion] = useState([]);
  const [transacciones, settransacciones] = useState([]);

  useEffect(() => {
    (async () => {
      //🔹 función autoinvocada
      const { response, success } = await consultaGetBackend(`${URI}/data-charts`);
      if (success) {
        setproduccion(response.data.data.produccion);

        const trans_compras = response.data.data.transaccionesC;
        const trans_ventas = response.data.data.transaccionesV;
        const join_transacciones = trans_compras.concat(trans_ventas);
        settransacciones(join_transacciones);
      };

    })()
  }, [])


  const labels_products = produccion && produccion.map(r => r.fk_tipo_producto + ' ' + r.fk_color);
  const data_products = produccion && produccion.map(r => r.cantidades);
  // console.log(labels_products, data_products)

  // Configuración de Datos para gráfico Barras (Producción) 📌
  const data_produccion = {
    labels: produccion ? labels_products : ['No Disponible'],
    datasets: [
      {
        label: 'Cantidad',
        data: data_products,
        backgroundColor: colores_barras,
        // borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options_produccion = {
    plugins: {
      title: {
        display: false,
        text: 'Producción',
      },
    },
    // maintainAspectRatio: true
    aspectRatio: 1.5
  };


  // Configuración de Datos para grafico Dona (Transacciones)📌
  const t_ventas = transacciones
    .filter(f => f.fk_tipo_transaccion === 'Venta')
    .map(r => parseFloat(r.precio))
    ;
  const valor_ventas = t_ventas.reduce((inicial, total) => inicial + total, 0).toFixed(3);

  const t_compras = transacciones
    .filter(f => f.fk_tipo_transaccion === 'Compra')
    .map(r => parseFloat(r.precio))
    ;
  const valor_compras = t_compras.reduce((inicial, total) => inicial + total, 0).toFixed(3);

  const data_transacciones = {
    labels: ['Compras', 'Ventas'],
    datasets: [
      {
        label: 'Compras',
        data: [valor_compras, valor_ventas],
        backgroundColor: colores_barras,
      },
    ],
  };

  const options_transacciones = {
    maintainAspectRatio: true,
    responsive: true,
    animation: true,
    plugins: {
      legend: {
        display: true
      }
    },
  };


  return (
    <section className=" rows-inicio section-charts">

      <article className='chart1'>
        <h3>Producción Actual</h3>

        <div style={{ height: '90%', width: '78%', margin: 'auto' }}>
          <Bar
            data={data_produccion}
            options={options_produccion}
          />
        </div>
      </article>

      <article className='chart2'>
        <h3>Transacciones</h3>

        <div style={{ height: '90%', width: '78%', margin: 'auto' }}>
          <Doughnut
            data={data_transacciones}
            options={options_transacciones}
          />
        </div>
      </article>

    </section>
  )
}

export default HomeCharts;