import EditInvProduccion from "./modals/Updates/EditInvProduccion";
import DeleteModal from "./modals/Deletes/DeleteModal.jsx";

function TablaProduccion({ registros, opciones, actualizar }) {
  return (
    <table className='tabla-principal'>

      <thead className={!opciones ? 'theads-sticky' : null} >
        <tr>
          <th style={{minWidth: '50px'}}>N°</th>
          {opciones && <th>Consecutivo</th>}
          <th>Lote</th>
          {!opciones && <th>Peso Jumbo</th>}
          <th>Producto</th>
          <th>Color</th>
          <th>Medición</th>
          <th>Peso</th>
          {opciones && <th>Medida</th>}
          {opciones && <th>Cantidad</th>}
          {opciones && <th>Precio</th>}
          {opciones && <th>Fecha Registro</th>}
          {opciones && <th>Usuario</th>}
          {opciones && <th colSpan={2}>Acciones</th>}
        </tr>
      </thead>

      <tbody>
        {
          !!registros ?
            registros.length > 0 ?
              registros.map((row) => (
                <tr key={row.id_inv_produccion}>
                  <td>{row.id_inv_produccion}</td>
                  {opciones && <td>{row.consecutivo_insumo}</td>}
                  <td>{row.id_rollo_jumbo}</td>
                  {!opciones && <td>{row.peso_jumbo}</td>}
                  <td>{row.fk_tipo_producto}</td>
                  <td>{row.fk_color}</td>
                  <td>{row.unidad_medida}</td>
                  <td>{row.peso_producto < 1 ? '--' : row.peso_producto}</td>
                  {opciones && <td>{!!row.medida ? row.tipo_medicion === 'rollo por metro' ? `${row.medida}mts` : row.medida : '--'}</td>}
                  {opciones && <td>{row.cantidad ? row.tipo_medicion === 'resma por hojas' ? `${row.cantidad}hjs` : row.cantidad : '--'}</td>}
                  {opciones && <td style={{textAlign: 'left'}}>$  {row.precio}</td>}
                  {opciones && <td>{row.fecha_registro.split('T')[0]}</td>}
                  {opciones && <td>{row.alias}</td>}
                  {opciones && ( <>
                    <td>
                      <EditInvProduccion
                        data_id={row.id_inv_produccion}
                        producto={row.id_producto}
                        peso_producto={row.peso_producto}
                        actualizar={() => {actualizar(true)}}
                      />
                    </td>
                    <td>
                    <DeleteModal
                      data_id={row.id_inv_produccion}
                      titulo={'Inventario Producción'}
                      endpoint={`/inv/produccion-delete`}
                      actualizar={() => {actualizar(true)}}
                      imagen_ruta={require('../../assets/imgs/eliminar.png')}
                      altura={'26px'}
                    />
                  </td>
                  </> )
                  }
                </tr>
              ))
              : <tr key={null}>
                <td colSpan={10}>❌ No hay Registros disponibles</td>
              </tr>
            : <tr key={null}>
              <td colSpan={10}>Seleccione un Rollo Jumbo 📌</td>
            </tr>
        }
      </tbody>

      <tfoot>
        {
          //IDEAS PARA CONCLUIR INFORMACIÓN DE REGISTROS POR ROLLO MEDIANO O JUMBO


          // <tr>
          //   <td colSpan={3}>Peso Inicial: 116.00 {registros.length}</td> 
          //   {/* registros[0].peso_inicial */}
          //   <td colSpan={2}>Peso Corte: 145.20</td>
          //   <td>29.20</td>
          // </tr>
        }

        {/* <tr>
          <td colSpan={5}>Peso Inicial: </td>
          <td colSpan={5}>116.00</td>
        </tr>
        <tr>
          <td colSpan={5}>Peso Corte: </td>
          <td colSpan={5}>145.20</td>
        </tr>
        <tr>
          <td colSpan={5}>Parafina Consumida:</td>
          <td colSpan={5}> 29.20</td>
        </tr> */}
      </tfoot>

    </table>
  )
}

export default TablaProduccion