import React from 'react'


function TbodyRollosMedianos({ id, consecutivo, insumo, color1, color2, peso, registro, getTableJumbos, selected }) {

 
  return (
    <>
      <tr key={id}
        onClick={() => getTableJumbos(id)}
        onDoubleClick={() => getTableJumbos(0)}        
        className={selected ? 'selected' : ''}
        >

        <td>{id}</td>
        <td>{consecutivo}</td>
        <td>{insumo}</td>
        <td>{color1}</td>
        <td>{color2}</td>
        <td>{peso}</td>
        <td>{registro.split('T')[0]}</td>

      </tr>
      
    </>
  )
}

export default TbodyRollosMedianos
