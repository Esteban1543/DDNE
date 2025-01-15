
//♨️ Importar Conexión de DB
import connection from '../../database/conexion.js';

//🔸 Función para Actualizar un registro en Inv- Insumos
export function UpdateRegistrationSupplies(req, res) {

  // Recuperar Datos de Frontend
  const { id } = req.params;
  const { estado, fecha_recepcion } = req.body;

  // Consulta DB
  const consulta_sql = `UPDATE inventario_insumos 
    SET fk_estado = ?, fecha_recepcion = ? 
    WHERE id_inventario_insumos = ? `;

  connection.query(consulta_sql, [estado, fecha_recepcion === 'null' ? null : fecha_recepcion, id], (error, results) => {
    if (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: 'Error al Editar registro de Inv - Insumos',
        error: error.message
      });
      return;
    }

    console.log('✅ Registro Actualizado!!');

    res.json({
      success: true,
      message: '✅ Registro Actualizado en Inventario Insumos!!',
      info: results.info
    });
  })
}

//🔸 Función para Actualizar un registro en Inv- Medianos
export function UpdateRegistrationMediumRolls(req, res) {

  // Recuperar Datos de Frontend
  const { id } = req.params;
  const { color1, color2, peso_inicial } = req.body;

  // Queries segun datos disponibles a actualizar
  const queries = [
    {
      "query": "UPDATE rollos_medianos SET fk_color_1 = ?, fk_color_2 = ?, peso = ?  where id_rollos_medianos = ? ",
      "arguments": [
        color1,
        color2,
        peso_inicial,
        id
      ]
    },

    {
      "query": "UPDATE rollos_medianos SET peso = ?  where id_rollos_medianos = ? ",
      "arguments": [
        peso_inicial,
        id
      ]
    }
  ]

  // Consulta DB
  const consulta_sql = `SELECT * 
    FROM cortes_jumbo 
    WHERE pfk_rollo_mediano = ?`;

  connection.query(consulta_sql, [id], (error, results) => {
    if (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: 'Error al Editar registro de Rollos Medianos ',
        error: error.message
      });
      return;
    }

    connection.query(results.length > 0 ? queries[1].query : queries[0].query, results.length > 0 ? queries[1].arguments : queries[0].arguments,
      (error, results1) => {
        if (error) {
          console.log(error);

          res.status(500).json({
            success: false,
            message: 'Error al Editar registro de Rollos Medianos ',
            error: error.message
          });
          return;
        }

        if (results.length > 0) {
          res.json({
            success: true,
            message: '✅ Peso Actualizado,  ❌ Colores no se puede Actualizar',
            info: results1.info
          })
        } else {
          res.json({
            success: true,
            message: '✅ Registro Actualizado en Rollos Medianos!!',
            info: results1.info
          })
        }
      })
  })
}

//🔸 Función para Actualizar un registro en Inv- Jumbos
export function UpdateRegistrationJumboRolls(req, res) {

  // Recuperar Datos de Frontend
  const { idRolloMediano, idRolloJumbo } = req.params;
  const { peso_jumbo, color } = req.body;

  // Consulta DB
  const consulta_sql = `UPDATE cortes_jumbo 
    SET peso_jumbo = ?, fk_color = ? 
    WHERE pfk_rollo_mediano = ? AND rollo_jumbo = ?`

  connection.query(consulta_sql, [peso_jumbo, color, idRolloMediano, idRolloJumbo], (error, results) => {
    if (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: 'Error al Editar registro de Rollos Jumbo',
        error: error.message
      });
      return;
    }

    console.log('✅ Registro Actualizado!!');

    res.json({
      success: true,
      message: '✅ Registro Actualizado en Rollos Jumbo!!',
      info: results.info
    });
  })
}

//🔸 Función para Actualizar un registro en Inv- Producción
export function UpdateRegistrationProduction(req, res) {

  // Recuperar Datos de Frontend
  const { idInvProduccion } = req.params;
  const { producto_final, peso_producto } = req.body;

  // Consulta DB
  const consulta_sql = `UPDATE inventario_produccion 
    SET fk_producto = ?, peso_producto = ? 
    WHERE id_inv_produccion = ?`;

  connection.query(consulta_sql, [producto_final, peso_producto, idInvProduccion], (error, results) => {
    if (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: 'Error al Editar registro de Inv - Producción',
        error: error.message
      });
      return;
    }

    console.log('✅ Registro Actualizado!!');

    res.json({
      success: true,
      message: '✅ Registro Actualizado en Inventario Producción!!',
      info: results.info
    });
  })
}

// results >  ResultSetHeader {
//   fieldCount: 0,
//   affectedRows: 1,
//   insertId: 0,
//   info: 'Rows matched: 1  Changed: 1  Warnings: 0',
//   serverStatus: 2,
//   warningStatus: 0,
//   changedRows: 1
// }