import React from 'react'

function TbodyProduccion({id, registro, consecutivo, jumbo, producto, color, unidades, peso_jumbo, user}) {

  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{registro}</td>
        <td>{consecutivo}</td>
        <td>{jumbo}</td>
        <td>{producto}</td>
        <td>{color}</td>
        <td>{unidades}</td>
        <td>{peso_jumbo}</td>
        <td>{user}</td>
      </tr>
    </>
  )
}

export default TbodyProduccion
