
import EditRollosMedianos from "./modals/Updates/EditRollosMedianos.jsx"
import DeleteModal from "./modals/Deletes/DeleteModal.jsx"


function TablaRollosMedianos({ registros, opciones, actualizar, getTableJumbos }) {

  return (
    <table className='tabla-principal'>

      <thead className={opciones ? null : 'theads-sticky'} >
        <tr>
          <th>N°</th>
          <th>Consecutivo Insumo</th>
          <th>Cod. Insumo</th>
          <th>Color 1</th>
          <th>Color 2</th>
          <th>Peso Inicial</th>
          <th>Fecha Registro</th>
          {opciones && <th>Usuario</th>}
          {opciones && <th colSpan={2}>Acciones</th>}
        </tr>
      </thead>

      <tbody>
        {
          registros.length > 0 ?
            registros.map(row => (
              <tr
                key={row.id_rollos_medianos}
                onClick={opciones ? undefined : () => getTableJumbos(row.id_rollos_medianos)}
                onDoubleClick={opciones ? undefined : () => getTableJumbos(0)}
                className={!opciones && row.selected ? 'selected' : null}
              >
                <td>{row.id_rollos_medianos}</td>
                <td>{row.consecutivo_insumo}</td>
                <td>{row.fk_insumo}</td>
                <td>{row.fk_color_1}</td>
                <td>{row.fk_color_2}</td>
                <td>{row.peso}</td>
                <td>{row.fecha_registro.split('T')[0]}</td>
                {opciones && <td>{row.alias}</td>}
                {!opciones ? null : (
                  <td>
                    <EditRollosMedianos
                      data_id={row.id_rollos_medianos}
                      consecutivo={row.consecutivo_insumo}
                      color1={row.fk_color_1}
                      color2={row.fk_color_2}
                      peso={row.peso}
                      actualizar={() => { actualizar(true) }}
                    />
                  </td>
                )}
                {opciones && (
                  <td>
                    <DeleteModal
                      data_id={row.id_rollos_medianos}
                      actualizar={() => { actualizar(true) }}
                      titulo={'Rollos Medianos'}
                      endpoint={`/inv/medianos-delete`}
                      imagen_ruta={require('../../assets/imgs/eliminar.png')}
                      altura={'26px'}
                    />
                  </td>
                )}
              </tr>
            )) : <tr key={null}>
              <td colSpan={9}> ❌ No hay Registros disponibles</td>
            </tr>
        }

        {/* <tr
            key={id}
            onClick={opciones ? undefined : () => getTableJumbos(id)}
            onDoubleClick={opciones ? undefined : () => getTableJumbos(0)}
            className={!opciones && selected ? 'selected' : ''}
          >
            <td>{id}</td>
            <td>{consecutivo}</td>
            <td>{insumo}</td>
            <td>{color1}</td>
            <td>{color2}</td>
            <td>{peso}</td>
            <td>{registro.split('T')[0]}</td>
            {
              !opciones ? '' : (
                <td>
                  <EditRollosMedianos
                    data_id={id}
                    color1={color1}
                    color2={color2}
                    peso={peso}
                  />
                </td>
              )
            }
          </tr> */}
      </tbody>

    </table>
  )
}

export default TablaRollosMedianos