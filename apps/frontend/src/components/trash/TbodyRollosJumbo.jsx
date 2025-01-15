import React from 'react'

function TbodyRollosJumbo({id, numero_rollo, peso_corte, color, getTableProduction, selected}) {

  return (
    <>
      <tr key={id}
        onClick={()=> getTableProduction(id+'-'+numero_rollo)}
        onDoubleClick={() => getTableProduction(0+'-'+0)}
        className={selected ? 'selected' : ''}>
        <td>{id}</td>
        <td>{numero_rollo}</td>
        <td>{peso_corte}</td>
        <td>{color}</td>
      </tr>
    </>
  )
}

export default TbodyRollosJumbo
