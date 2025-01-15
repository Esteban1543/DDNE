// Funciones📌
import { getData } from './getData.js'


/* Función para:
   🔸Activar clase en fila seleccionada
   🔸Establecer registros en la Tabla Rollos Jumbo 
   ⚠️con base al ID seleccionado en la tabla Rollos Medianos
  */
export const onSelect = (id, rollosMedianos, setRollosMedianos, setRollosJumbo, ENDPOINT_ROLLOS_JUMBOS) => {

  // Aplicar claseName (selected)
  const updatedRollosMedianos = rollosMedianos.map((x) => ({
    ...x,
    selected: x.id_rollos_medianos === id ? true : false
  }));
  setRollosMedianos(updatedRollosMedianos);

  //Solicitud a Backend 
  getData(`${ENDPOINT_ROLLOS_JUMBOS}/${id}`, setRollosJumbo)
}


/* Función para:
  🔸Activar clase en fila seleccionada
  🔸Establecer registros en la Tabla Inv-Produccion 
  ⚠️con base al ID seleccionado en la tabla Rollos Jumbo
  */
export const onSelect2 = (id, rollosJumbo, setRollosJumbo, setProduccion, ENDPOINT_INV_PRODUCCION) => {
  const idRolloMediano = parseInt(id.split('-')[0]);
  const idRolloJumbo = parseInt(id.split('-')[1]);

  // Aplicar claseName
  const updatedRollosJumbo = rollosJumbo.map((j) => ({
    ...j,
    selected: j.pfk_rollo_mediano === idRolloMediano && j.rollo_jumbo === idRolloJumbo ? true : false
  }))
  setRollosJumbo(updatedRollosJumbo)

  //Solicitud a Backend
  getData(`${ENDPOINT_INV_PRODUCCION}/${idRolloMediano}/${idRolloJumbo}`, setProduccion)
}