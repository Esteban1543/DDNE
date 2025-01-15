
import DeleteModal from "./modals/Deletes/DeleteModal.jsx"
import EditRollosJumbo from "./modals/Updates/EditRollosJumbo.jsx"



function TablaRollosJumbo({ registros, opciones, actualizar, getTableProduction }) {
  return (
    <table className='tabla-principal'>

      <thead className={opciones ? null : 'theads-sticky'} >
        <tr>
          <th>Rollo Mdno</th>
          <th>N° Jumbo</th>
          <th>Peso Jumbo</th>
          <th>Color Rollo</th>
          {opciones && <th>Registro</th>}
          {opciones && <th>Usuario</th>}
          {opciones && <th colSpan={2}>Acciones</th>}
        </tr>
      </thead>

      <tbody>
        {
          !!registros ?
            registros.length > 0 ?
              registros.map((row, i) => (
                <tr key={i}
                  onClick={opciones ? undefined : () => getTableProduction(row.pfk_rollo_mediano + '-' + row.rollo_jumbo)}
                  onDoubleClick={opciones ? undefined : () => getTableProduction(0 + '-' + 0)}
                  className={!opciones && row.selected ? 'selected' : ''}>
                  <td>{row.pfk_rollo_mediano}</td>
                  <td>{row.rollo_jumbo}</td>
                  <td>{row.peso_jumbo}</td>
                  <td>{row.fk_color}</td>
                  {opciones && <td>{row.fecha_registro.split('T')[0]}</td>}
                  {opciones && <td>{row.alias}</td>}
                  {
                    opciones && (
                      <td style={{ padding: '0' }}>
                        <EditRollosJumbo
                          data_id={`${row.pfk_rollo_mediano}/${row.rollo_jumbo}`}
                          color={row.fk_color}
                          peso={row.peso_jumbo}
                          actualizar={() => { actualizar(true) }}
                        />
                      </td>
                    )
                  }
                  {
                    opciones && (
                      <td style={{ padding: '0' }}>
                        <DeleteModal
                          data_id={`${row.pfk_rollo_mediano}/${row.rollo_jumbo}`}
                          titulo={'Rollos Jumbo'}
                          endpoint={`/inv/jumbos-delete`}
                          actualizar={() => { actualizar(true) }}
                          imagen_ruta={require('../../assets/imgs/eliminar.png')}
                          altura={'26px'}
                        />
                      </td>
                    )
                  }
                </tr>
              )) : <tr key={null}>
                <td colSpan={7}>❌ No hay Registros disponibles</td>
              </tr>
            : <tr key={null}>
              <td colSpan={5}>Seleccione un Rollo Mediano 📌</td>
            </tr>
        }

        {/* <tr key={id}
            onClick={opciones ? undefined : () => getTableProduction(id + '-' + numero_rollo)}
            onDoubleClick={opciones ? undefined : () => getTableProduction(0 + '-' + 0)}
            className={!opciones && selected ? 'selected' : ''}>
            <td>{id}</td>
            <td>{numero_rollo}</td>
            <td>{peso_corte}</td>
            <td>{color}</td>
            {
              !opciones ? '' : (
                <td style={{ padding: '0' }}>
                  <EditRollosJumbo
                    data_id={`${id}/${numero_rollo}`}
                    color={color}
                    peso={peso_corte}
                  />
                </td>
              )
            }
          </tr> */}
      </tbody>

      {
        !opciones ? (
          <tfoot>
            {!!registros && registros.length > 0 ?
              <tr key={'peso_corte'} style={{ cursor: 'default' }}>
                <td colSpan={2}> <code><strong>Peso Corte:</strong></code></td>
                <td colSpan={2}><code><strong>{registros[0].peso_corte_total}</strong></code></td>
              </tr>
              : null
            }
          </tfoot>
        ) : null
      }
    </table>
  )
}

export default TablaRollosJumbo