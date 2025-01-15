
import { useState, useEffect } from 'react'
import { Toaster } from 'sonner';
import { URI } from '../../config.js';

//Componentes 🎗️
import Loading from '../organisms/Loading.jsx';
import TitulosPaginas from '../molecules/TitulosPaginas.jsx';
import ItemsBar from '../organisms/ItemsBar.jsx';
import TablaRollosMedianos from '../organisms/TablaRollosMedianos.jsx'
import TablaRollosJumbo from '../organisms/TablaRollosJumbo.jsx';
import TablaProduccion from '../organisms/TablaProduccion.jsx';

// Funciones📌
import { getData } from '../../helpers/getData.js';
import { onSelect, onSelect2 } from '../../helpers/onSelects.js';

// Styles ✨
import '../../assets/styles/seguimiento-lote.css';

// API ⚙️
const ENDPOINT_ROLLOS_MEDIANOS = `${URI}/inv/medianos`;
const ENDPOINT_ROLLOS_JUMBOS = `${URI}/inv/jumbos`; //:/idRolloMediano
const ENDPOINT_INV_PRODUCCION = `${URI}/inv/produccion`; // :/idRolloMediano:/idRolloJumbo


function SeguimientoLote() {

  //Hooks 🔗
  const [loading, setLoading] = useState(true);
  const [rollosMedianos, setRollosMedianos] = useState([]);
  const [rollosJumbo, setRollosJumbo] = useState(false);
  const [produccion, setProduccion] = useState(false);
  const [update, setUpdate] = useState(false);
  const [jumbos_loaded, setJumbos_loaded] = useState(false);
  const [production_loaded, setProduction_loaded] = useState(false);

  //🔸 Cargar la informacion de la Tabla Rollos Medianos al montar el componente
  useEffect(() => {
    getData(ENDPOINT_ROLLOS_MEDIANOS, setRollosMedianos)
    setTimeout(() => setLoading(false), 700);
  }, [update]);

  //🔸 Seleccion de Registro en Rollos Mediano
  const selectRollomediano = (id) => {
    onSelect(id, rollosMedianos, setRollosMedianos, setRollosJumbo, ENDPOINT_ROLLOS_JUMBOS)
    setJumbos_loaded(true);
  }

  //🔸 Seleccion de Registro en Rollos Jumbo
  const selectRolloJumbo = (id) => {
    onSelect2(id, rollosJumbo, setRollosJumbo, setProduccion, ENDPOINT_INV_PRODUCCION)
    setProduction_loaded(true);
  }

  //🔸 Formatear la Tabla Producción al cambiar el estado en Rollos Jumbo y/o Medianos
  useEffect(() => { setRollosJumbo(false) }, [update])
  useEffect(() => { setProduccion(false) }, [rollosJumbo, update])


  return (
    <>
      <TitulosPaginas titulo={'Seguimiento de Lote'} />

      <ItemsBar
        Nombre={'Produccion'}
        actualizar={() => setUpdate(Math.random())}
      />

      <section className='section-seguimiento-lote'>

        <article className='seguimiento-lote-colum-1'>
          {loading
            ? <Loading />
            :
            <TablaRollosMedianos
              registros={rollosMedianos}
              opciones={false}
              getTableJumbos={selectRollomediano}
            />
          }

        </article>

        <div className="seguimiento-lote-colum-2">

          <article className={jumbos_loaded ? 'colum-2-table1 filled' : 'colum-2-table1 white-space'}>

            {
              jumbos_loaded ? (
                <TablaRollosJumbo
                  registros={rollosJumbo}
                  getTableProduction={selectRolloJumbo}
                  opciones={false}
                />
              ) : <span>Parafinado</span>
            }

          </article>

          <hr style={{ margin: '0.7rem 0' }} />

          <article className={production_loaded ? 'colum-2-table2 filled' : 'colum-2-table2 white-space'}>
            {
              production_loaded ? (
                <TablaProduccion
                  registros={produccion}
                  opciones={false}
                />
              ) : <span>Producción</span>
            }

          </article>

        </div>
      </section>

      <Toaster position="bottom-right" richColors />

    </>
  )
}

export default SeguimientoLote