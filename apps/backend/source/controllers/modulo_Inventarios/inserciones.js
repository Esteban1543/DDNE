
//♨️ Importar Conexión de DB
import connection from '../../database/conexion.js';

//♨️ Schemas de Validación para Inserts en DB
import { form_inv_insumos, form_rollos_medianos, form_rollos_jumbo, form_inv_produccion } from '../../models/modelos_inventarios.js';

//🔸 Establecer constante de Fecha PC para Registros
const fecha_registro = new Date().toISOString().split("T")[0]; //Fecha Actual del momento de generar el registro


//🔸 Función para Crear un registro en Inv - Insumos
export const newRegistrationSupplies = (req, res) => {

  //🔹 Obtener Datos de Formulario
  const { fk_n_transaccion, consecutivo, tipo_insumo, peso, estado, fecha_planificada, unidades, proveedor, idUser } = req.body;
  const idProveedor = proveedor.split(".")[0];
  const tiProveedor = proveedor.split(".")[1];

  //🔹 Validacion de Datos en req.body para inserción en DB
  const validacion = form_inv_insumos.safeParse({ fk_n_transaccion, consecutivo, tipo_insumo, peso, estado, fecha_planificada, unidades, proveedor, idUser });
  if (!validacion.success) {

    res.status(400).json({
      success: false,
      message: 'Error en Tipo de Datos',
      error: validacion.error.issues
    });
    return
  }

  //🔹 Consulta DB
  connection.query('INSERT INTO inventario_insumos SET ?', {
    fk_n_transaccion,
    fk_tipo_insumo: tipo_insumo,
    consecutivo_insumo: consecutivo,
    peso_insumo: peso,
    fk_estado: estado,
    unidades: unidades,
    fecha_planificada: fecha_planificada,
    fecha_registro: fecha_registro,
    fk_proveedor: idProveedor,
    fk_ti_proveedor: tiProveedor,
    fk_usuario: idUser,
    estado_registro: 1
  }, (error, results) => {
    if (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al crear registro de inventario Insumos',
        error: error.message
      });
      return;
    }

    console.log('Registro Exitoso!! ✅');

    res.status(201).json({
      success: true,
      message: 'Registro Exitoso en Inventario Insumos!! ✅',
    });
  }
  );
}


//🔸 Función para Crear un registro en Inv - Medianos
export const newRegistrationMediumRolls = (req, res) => {

  //🔹 Obtener Datos de Formulario
  const { consecutivo_insumo, color1, color2, peso_inicial, idUser } = req.body;

  //🔹 Validacion de Datos en req.body para inserción en DB
  const validacion = form_rollos_medianos.safeParse({ consecutivo_insumo, color1, color2, peso_inicial, idUser });
  if (!validacion.success) {

    res.status(400).json({
      success: false,
      message: 'Error en Tipo de Datos',
      error: validacion.error.issues
    });
    return
  }

  //Consulta DB
  connection.query('INSERT INTO rollos_medianos SET ?', {
    fecha_registro: fecha_registro,
    fk_insumo: consecutivo_insumo,
    fk_color_1: color1,
    fk_color_2: color2,
    peso: peso_inicial,
    fk_usuario: idUser,
    estado_registro: 1
  }, (error, results) => {
    if (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al crear registro de rollos medianos',
        error: error.message
      });
      return
    }

    console.log('Registro Exitoso!! ✅');

    res.status(201).json({
      success: true,
      message: 'Registro Exitoso en Rollos Medianos!! ✅',
    });
  })
}


//🔸 Función para Crear un registro en Inv - Jumbos
export const newRegistrationJumboRolls = (req, res) => {

  //🔹 Obtener Datos de Formulario
  const { id_rolloMdno, id_rolloJumbo, peso_jumbo, color, idUser } = req.body;

  //🔹 Validacion de Datos en req.body para inserción en DB
  const validacion = form_rollos_jumbo.safeParse({ id_rolloMdno, id_rolloJumbo, peso_jumbo, color, idUser });
  if (!validacion.success) {

    res.status(400).json({
      success: false,
      message: 'Error en Tipo de Datos',
      error: validacion.error.issues
    });
    return
  }

  //Consulta DB
  connection.query('INSERT INTO cortes_jumbo SET ?', {
    fecha_registro: fecha_registro,
    pfk_rollo_mediano: id_rolloMdno,
    rollo_jumbo: id_rolloJumbo,
    peso_jumbo: peso_jumbo,
    fk_color: color,
    fk_usuario: idUser,
    estado_registro: 1
  }, (error, results) => {
    if (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al crear registro de rollos jumbo',
        error: error.message
      });
      return
    }

    console.log('Registro Exitoso!! ✅');

    res.status(201).json({
      success: true,
      message: 'Registro Exitoso en Rollos Jumbos!! ✅',
    });
  });
}


//🔸 Función para Crear un registro en Inv - Producción
export const newRegistrationProduction = (req, res) => {

  //🔹 Obtener Datos de Formulario
  const { id_rolloMdno, id_rolloJumbo, color, producto_final, peso_producto, idUser } = req.body;
  // const id_rollo_jumbo = parseInt(id_rolloJumbo.split('-')[0]); Pendiente por manejo de datos en Frontend de React Web
  
  
  //🔹 Validacion de Datos en req.body para inserción en DB
  const validacion = form_inv_produccion.safeParse({ id_rolloMdno, id_rolloJumbo, producto_final, peso_producto, idUser });
  if (!validacion.success) {

    res.status(400).json({
      success: false,
      message: 'Error en Tipo de Datos',
      error: validacion.error.issues
    });
    return
  }

  //🔹 Consulta DB
  connection.query('INSERT INTO inventario_produccion SET ?', {
    fecha_registro: fecha_registro,
    fk_rollo_mediano: id_rolloMdno,
    fk_rollo_jumbo: id_rolloJumbo.split('-')[0],
    fk_color: color,
    fk_producto: producto_final,
    peso_producto: peso_producto,
    fk_usuario: idUser,
    estado_registro: 1
  }, (error, results) => {
    if (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al crear registro de inventario Producción',
        error: error.message
      });
      return
    }

    console.log('Registro Exitoso!! ✅');

    res.status(201).json({
      success: true,
      message: 'Registro Exitoso en Inventario Insumos!! ✅',
    });

  }
  )
}