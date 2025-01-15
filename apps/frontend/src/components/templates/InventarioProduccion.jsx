import { useState, useEffect } from 'react'
import { Toaster } from 'sonner';
import { URI } from '../../config.js';

// Componentes 🎗️
import Loading from '../organisms/Loading.jsx';
import ItemsBar from '../organisms/ItemsBar.jsx';
import TablaProduccion from '../organisms/TablaProduccion.jsx';

// Funciones 📌
import { getData } from '../../helpers/getData.js';
import { getPage } from '../../helpers/paginación.js';
import BotonesPaginacion from '../organisms/BotonesPaginacion.jsx';

// API ⚙️
const ENDPOINT = `${URI}/inv/produccion`;


function InventarioProduccion() {

  //Hooks 🔗
  const [loading, setLoading] = useState(true);
  const [registros, setRegistros] = useState([]);
  const [update, setUpdate] = useState(false);

  //🔸 Solicitud de Datos a API 
  useEffect(() => {
    getData(ENDPOINT, setRegistros)
    setTimeout(() => setLoading(false), 700);
  }, [update]);


  //🔸 Realizar Paginación de Tabla
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;

  const pagina = getPage(registros, paginaActual, registrosPorPagina);

  const goPage = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };


  return (
    <>
      {/* <TopButtons idModal={'modalesProduccion'} actualizar={() => setUpdate(!update)} /> */}

      <ItemsBar
        Nombre={'Inventario de Produccion'}
        actualizar={() => setUpdate(prevUpdate => !prevUpdate)}
      />

      <section className='section-inv-insumos section-tabla-principal'>
        {loading
          ? <Loading />
          :
          <TablaProduccion
            registros={pagina}
            opciones={true}
            actualizar={() => setUpdate(prevUpdate => !prevUpdate)}
          />
        }

        <BotonesPaginacion
          inicio={() => goPage(1)}
          fin={() => goPage(Math.ceil(registros.length / registrosPorPagina))}
          click1={() => goPage(paginaActual - 1)}
          disable1={paginaActual === 1}
          click2={() => goPage(paginaActual + 1)}
          disable2={paginaActual === Math.ceil(registros.length / registrosPorPagina)}
          pagina={paginaActual}
        />

      </section>

      <Toaster position="top-right" richColors />

    </>

  )
}

export default InventarioProduccion