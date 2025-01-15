//Importaciones
import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import { URI } from '../../config.js';

// Componentes🎗️
import Loading from '../organisms/Loading.jsx';
import TitulosPaginas from '../molecules/TitulosPaginas.jsx';
import ItemsBar from '../organisms/ItemsBar.jsx';
import EditInvInsumos from '../organisms/modals/Updates/EditInvInsumos.jsx';
import DeleteModal from '../organisms/modals/Deletes/DeleteModal.jsx';
import BotonesPaginacion from '../organisms/BotonesPaginacion.jsx';

// Funciones 📌
import { getData } from '../../helpers/getData.js';
import { getPage } from '../../helpers/paginación.js';

// Styles ✨
import '../../assets/styles/inv-insumos.css';

// API ⚙️
const ENDPOINT = `${URI}/inv/insumos`;


function InventarioInsumos() {

  //Hooks 🔗
  const [loading, setLoading] = useState(true);
  const [registros, setRegistros] = useState([]);
  const [update, setUpdate] = useState(false);

  //🔸 Solicitud de Datos a API
  useEffect(() => {
    getData(ENDPOINT, setRegistros);
    setTimeout(() => setLoading(false), 700);
  }, [update]);

  //🔸 Realizar Paginación de Tabla
  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 10;
  const pagina = getPage(registros, paginaActual, registrosPorPagina);

  // goPage(numeroPagina, setPaginaActual)
  const goPage = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const actualizar_registros = (coincidencias) => {    
    if(coincidencias !== null) return setRegistros(coincidencias);
    
    setUpdate(prevUpdate => !prevUpdate);
    toast.warning(<h6><strong>Sin coincidencias ⛔</strong></h6>)
  }

  return (
    <>

      <TitulosPaginas titulo={'Inventario Insumos'} />

      <ItemsBar
        Nombre={'Inventario de Insumos'}
        actualizar={() => setUpdate(prevUpdate => !prevUpdate)}
        registros_busqueda={registros}
        actualizar_registros={actualizar_registros}
      />


      <section className="section-tabla-principal ">

        {loading
          ? <Loading />
          :
          <table className='tabla-principal'>
            <thead>
              <tr>
                <th>N°</th>
                <th>Consecutivo</th>
                <th>Ref</th>
                <th>Insumo</th>
                <th>Unds</th>
                <th>Peso</th>
                <th>Programada</th>
                <th>Estado</th>
                <th>Recibido</th>
                <th>Proveedor</th>
                <th>Registro</th>
                <th>Usuario</th>
                <th colSpan={2}>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {
                registros.length > 0 && pagina !== null ? (
                  pagina.map((row) => (
                    <tr key={row.id_inventario_insumos}>
                      <td>{row.id_inventario_insumos}</td>
                      <td>{row.consecutivo_insumo}</td>
                      <td>TR{row.fk_n_transaccion < 10 ? '0' + row.fk_n_transaccion : row.fk_n_transaccion}</td>
                      <td>{row.fk_tipo_insumo}</td>
                      <td>{row.unidades}</td>
                      <td>{row.peso_insumo}</td>
                      <td>{row.fecha_planificada.split('T')[0]}</td>
                      <td>{row.fk_estado}</td>
                      <td>{row.fecha_recepcion != null ? row.fecha_recepcion.split('T')[0] : row.fk_estado === 'Cancelado' ? '✖️' : '...'}</td>
                      <td>{row.nombre_empresa}</td>
                      <td>{row.fecha_registro.split('T')[0]}</td>
                      <td>{row.alias}</td>

                      <td style={{ padding: '0 0.5rem' }}>
                        <EditInvInsumos
                          data_id={row.id_inventario_insumos}
                          estado={row.fk_estado}
                          actualizar={() => setUpdate(!update)}
                          insumo={row.fk_tipo_insumo}
                        />
                      </td>

                      <td>
                        <DeleteModal
                          data_id={row.id_inventario_insumos}
                          actualizar={() => setUpdate(!update)}
                          titulo={'Inventario Insumos'}
                          endpoint={`/inv/insumos-delete`}
                          imagen_ruta={require('../../assets/imgs/eliminar.png')}
                          altura={'26px'}
                        />
                      </td>
                    </tr>
                  ))
                ) : <tr key={null}>
                  <td colSpan={12}>❌ No hay Registros disponibles</td>
                </tr>
              }
            </tbody>
          </table>
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

export default InventarioInsumos;