
//♨️ Importar Conexión de DB
import connection from '../../database/conexion.js';

/*/////////////////////////////
  "Eliminar del Frontend" 📌
////////////////////////////*/


//🔸 Función para Editar el estado de un registro en Inv - Insumos
export function UnableRegistrationSupplies(req, res) {

  //🔹 Recuperar ID de Request
  const { id } = req.params;
  // const {estado_registro} = req.body;

  //🔹 Consulta DB
  const consulta_sql = `UPDATE inventario_insumos 
    SET estado_registro = ? 
    WHERE id_inventario_insumos = ? `;

  connection.query(consulta_sql, [false, id], (error, results) => {
    if (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: 'Error al Eliminar Registro en Inv - Insumos',
        error: error.message,
      });
      return;
    }

    console.log('Registro "Eliminado" !! ✅');

    res.json({
      success: true,
      message: 'Registro "Eliminado" en Inventario Insumos!! ✅',
      info: results.info
    });
  })
}

//🔸 Función para Editar el estado de un registro en Inv - Medianos
export async function UnableRegistrationMediumRolls(req, res) {

  //🔹 Recuperar ID de Request
  const { id } = req.params;

  //🔹 Consulta DB
  const rollos_medianos = `UPDATE rollos_medianos
    SET estado_registro = ? 
    WHERE id_rollos_medianos = ? `;

  const rollos_jumbo = `UPDATE cortes_jumbo
    SET estado_registro = ? 
    WHERE pfk_rollo_mediano = ?`;

  const produccion = `UPDATE inventario_produccion 
    SET estado_registro = ? 
    WHERE fk_rollo_mediano = ?`;

  try {
    const [rollosMedianos] = await connection.promise().query(rollos_medianos, [false, id]);
    const [rollosJumbo] = await connection.promise().query(rollos_jumbo, [false, id]);
    const [invProduccion] = await connection.promise().query(produccion, [false, id]);

    console.log('Registro "Eliminado" !! ✅');

    res.json({
      success: true,
      message: 'Registro "Eliminado" en Rollos Medianos!! ✅',
      info: {
        rollosMedianos,
        rollosJumbo,
        invProduccion
      }
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Error al Eliminar Registro en Rollos Medianos',
      error: error.message,
    });
  }

  // Razones para Eliminar 1 registro
  // - Dar de baja al registro por antiguedad
  // - Consecutivo Incorrecto
  // (El resto de campos se puede actualizar, pero los colores no se pueden actualizar si existen rollos jumbos asociados)
}



//🔸 Función para Editar el estado de un registro en Inv - Jumbos
export async function UnableRegistrationJumboRolls(req, res) {

  //🔹 Recuperar ID de Request
  const { idRolloMediano, idRolloJumbo } = req.params;

  //🔹 Consulta DB
  const rollos_jumbo = `UPDATE cortes_jumbo
    SET estado_registro = ? 
    WHERE pfk_rollo_mediano = ?  AND rollo_jumbo = ?`;

  const produccion = `UPDATE inventario_produccion 
    SET estado_registro = ? 
    WHERE fk_rollo_mediano = ? AND fk_rollo_jumbo = ?`;

  try {
    const [rollosJumbo] = await connection.promise().query(rollos_jumbo, [false, idRolloMediano, idRolloJumbo]);
    const [invProduccion] = await connection.promise().query(produccion, [false, idRolloMediano, idRolloJumbo]);

    console.log('Registro "Eliminado" !! ✅');

    res.json({
      success: true,
      message: 'Registro "Eliminado" en Rollos Jumbo!! ✅',
      info: {
        rollosJumbo,
        invProduccion
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al Eliminar Registro en Rollos Jumbo',
      error: error.message,
    });
  }
  // Razones para Eliminar 1 registro
  // - Dar de baja al registro por antiguedad desde el Rollo Mediano
  // - Rollor Mediano Incorrecto
  // - Rollor Jumbo Incorrecto
}


//🔸 Función para Editar el estado de un registro en Inv - Producción
export function UnableRegistrationProduction(req, res) {

  //🔹 Recuperar ID de Request
  const { id } = req.params;

  //🔹 Consulta DB
  const consulta_sql = `UPDATE inventario_produccion 
    SET estado_registro = ? 
    WHERE id_inv_produccion = ? `;

  connection.query(consulta_sql, [false, id], (error, results) => {
    if (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: 'Error al Eliminar Registro en Inv - Producción',
        error: error.message,
      });
      return;
    }

    console.log('Registro "Eliminado" !! ✅');

    res.json({
      success: true,
      message: 'Registro "Eliminado" en Inventario Producción!! ✅',
      info: results.info
    });
  })
  // Razones para Eliminar 1 registro
  // - Dar de baja al registro por antiguedad desde el Rollo Mediano
  // - 
}