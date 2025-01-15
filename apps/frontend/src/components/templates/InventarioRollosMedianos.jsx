import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { URI } from "../../config.js";

// Componentes 🎗️
import Loading from "../organisms/Loading.jsx";
import TablaRollosMedianos from "../organisms/TablaRollosMedianos.jsx"
import ItemsBar from "../organisms/ItemsBar.jsx";
import BotonesPaginacion from "../organisms/BotonesPaginacion.jsx";

// Funciones 📌
import { getData } from '../../helpers/getData.js';
import { getPage } from '../../helpers/paginación.js';

// API ⚙️
const ENDPOINT = `${URI}/inv/medianos`;


function InventarioRollosMedianos() {

  //Hooks 🔗
  const [loading, setLoading] = useState(true);
  const [rollosMedianos, setRollosMedianos] = useState([]);
  const [update, setUpdate] = useState(false);

  //🔸 Solicitud de Datos a API
  useEffect(() => {
    getData(ENDPOINT, setRollosMedianos);
    setTimeout(() => setLoading(false), 700);
  }, [update])


  //🔸 Realizar Paginación de Tabla
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;

  const pagina = getPage(rollosMedianos, paginaActual, registrosPorPagina);

  const goPage = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  return (
    <>

      <ItemsBar
        Nombre={'Medianos'}
        actualizar={() => setUpdate(prevUpdate => !prevUpdate)}
      />

      <section className="section-tabla-principal">
        {loading
          ? <Loading />
          :
          <TablaRollosMedianos
            registros={pagina}
            opciones={true}
            actualizar={() => setUpdate(prevUpdate => !prevUpdate)}
          />
        }

        <BotonesPaginacion
          inicio={() => goPage(1)}
          fin={() => goPage(Math.ceil(rollosMedianos.length / registrosPorPagina))}
          click1={() => goPage(paginaActual - 1)}
          disable1={paginaActual === 1}
          click2={() => goPage(paginaActual + 1)}
          disable2={paginaActual === Math.ceil(rollosMedianos.length / registrosPorPagina)}
          pagina={paginaActual}
        />

      </section>

      <Toaster position="top-right" richColors />

    </>
  )
}

export default InventarioRollosMedianos