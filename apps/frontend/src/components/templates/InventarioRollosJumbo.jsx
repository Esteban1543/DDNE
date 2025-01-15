import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { URI } from "../../config.js";

// Componentes🎗️
import Loading from "../organisms/Loading.jsx";
import ItemsBar from "../organisms/ItemsBar.jsx";
import TablaRollosJumbo from "../organisms/TablaRollosJumbo";
import BotonesPaginacion from "../organisms/BotonesPaginacion.jsx";

// Funciones 📌
import { getData } from '../../helpers/getData.js'
import { getPage } from '../../helpers/paginación.js';

// API ⚙️
const ENDPOINT = `${URI}/inv/jumbos`;


function InventarioRollosJumbo() {

  //Hooks 🔗
  const [loading, setLoading] = useState(true);
  const [rollosJumbo, setRollosJumbo] = useState([]);
  const [update, setUpdate] = useState(false);

  //🔸 Solicitud de Datos a API
  useEffect(() => {
    getData(ENDPOINT, setRollosJumbo)
    setTimeout(() => setLoading(false), 700);
  }, [update])

  //🔸 Realizar Paginación de Tabla
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;

  const pagina = getPage(rollosJumbo, paginaActual, registrosPorPagina);

  const goPage = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };


  return (
    <>
      {/* <TopButtons idModal={'modalesProduccion'} actualizar={() => setUpdate(!update)} /> */}

      <ItemsBar
        Nombre={'Jumbo'}
        actualizar={() => setUpdate(prevUpdate => !prevUpdate)}
      />

      <section className="section-tabla-principal">
        {loading
          ? <Loading />
          :
          <TablaRollosJumbo
            registros={pagina}
            opciones={true}
            actualizar={() => setUpdate(!update)}
          />
        }

        <BotonesPaginacion
          inicio={() => goPage(1)}
          fin={() => goPage(Math.ceil(rollosJumbo.length / registrosPorPagina))}
          click1={() => goPage(paginaActual - 1)}
          disable1={paginaActual === 1}
          click2={() => goPage(paginaActual + 1)}
          disable2={paginaActual === Math.ceil(rollosJumbo.length / registrosPorPagina)}
          pagina={paginaActual}
        />
        {/* {console.log('pagina Jumbo', pagina)} */}

      </section>

      <Toaster position="top-right" richColors />

    </>
  )
}

export default InventarioRollosJumbo