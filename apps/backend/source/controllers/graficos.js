import connection from "../database/conexion.js";

export async function DataCharts(req, res) {

  const consulta_sql_produccion = `SELECT p.fk_tipo_producto, ip.fk_color, COUNT(p.fk_tipo_producto) AS cantidades
  FROM inventario_produccion ip 
  JOIN productos p ON fk_producto = id_producto 
  WHERE ip.estado_registro = 1
  GROUP BY p.fk_tipo_producto, ip.fk_color
  ORDER BY p.fk_tipo_producto`;

  const consulta_sql_transaccionV = `SELECT fk_tipo_transaccion, fk_tipo_documento, fk_articulo, precio 
  FROM transacciones_ventas`;

  const consulta_sql_transaccionC = `SELECT fk_tipo_transaccion, fk_tipo_documento, fk_articulo, precio 
  FROM transacciones_compras`;

  try {
    const [produccion] = await connection.promise().query(consulta_sql_produccion);
    const [transaccionesV] = await connection.promise().query(consulta_sql_transaccionV);
    const [transaccionesC] = await connection.promise().query(consulta_sql_transaccionC);

    res.json({
      success: true,
      data: {
        produccion, 
        transaccionesV, 
        transaccionesC
      },
    });

  } catch (error) {
    console.log(error)
      res.status(500).json({
        success: false,
        message: 'Error interno del Servidor al obtener de inventario de ',
        error: error.message
      });
  }
}