
//Importar conexión a DB
import { set } from 'zod';
import connection from '../../database/conexion.js';
import XlsxPopulate from 'xlsx-populate';
import PDFDocument from 'pdfkit';
import fs from 'fs'
import { error } from 'console';
import { measureMemory } from 'vm';
// import path from 'path'


export function initialView_transaccionesCompras(req, res) {
  console.log('¬¬ Entrada en: "controllers/initialview_transaccionesCompras"');


  connection.query('SELECT tc.id_transacciones, tt.tp_transaccion, td.doc_transaccion, ti.nombre_insumo, e.nombre_empresa, e.descripcion_empresa, tc.fecha_registro, tc.precio, tc.comprobante, dt.persona_id, dt.fk_tipo_identificacion FROM transacciones_compras tc JOIN tipo_transaccion tt ON fk_tipo_transaccion = tp_transaccion JOIN tipo_documento td ON fk_tipo_documento = doc_transaccion JOIN tipo_insumo ti ON fk_articulo = nombre_insumo  JOIN proveedores p ON fk_proveedor = fk_id_proveedor JOIN datos_persona dt on persona_id = fk_proveedor LEFT JOIN empresas e ON fk_empresa = nit ORDER BY id_transacciones DESC;  ',
    (error, results) => {
      if (error) {
        console.log(error);

        res.json({ 
          success: false, 
          message: error.message 
        });
        return;
      }

      res.json({
        success: true,
        metadata: {
          Total_Datos: results.length,
        },
        data: results
      });
    });
}

export function initialView_transaccionesVentas(req, res) {
  console.log('¬¬ Entrada en: "controllers/initialview_transaccionesVentas"');


  connection.query('SELECT tv.id_transacciones, tt.tp_transaccion, td.doc_transaccion, tp.producto, e.nombre_empresa, tv.fecha_registro, tv.precio, tv.comprobante, dt.persona_id, fk_tipo_identificacion FROM transacciones_ventas tv JOIN tipo_transaccion tt ON fk_tipo_transaccion = tp_transaccion JOIN tipo_documento td ON fk_tipo_documento = doc_transaccion JOIN tipo_producto tp ON fk_articulo = producto JOIN clientes c ON fk_cliente = fk_id_cliente JOIN datos_persona dt on persona_id = fk_id_cliente LEFT JOIN empresas e ON fk_empresa = nit ORDER BY id_transacciones DESC;',
    (error, results) => {
      if (error) {
        console.log(error);

        res.json({
          success: false,
          message: error.message
        });
        return;
      }

      res.json({
        success: true,
        metadata: {
          Total_Datos: results.length,
        },
        data: results
      });
    });
}


export function initialView_products(req, res) {
  console.log('¬¬ Entrada en: "controllers/view_products"');


  connection.query('SELECT pd.*, pr.* FROM productos pd JOIN precios_productos pr ON pd.fk_precio = pr.id_precios;',
    (error, results) => {
      if (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        return;
      }

      res.json({
        success: true,
        metadata: {
          Total_Datos: results.length,
        },
        data: results
      });
    }
  );
}


export function initialTipe_Insumo(req, res){
  console.log('¬¬ Entrada en: "/initialTipe_Insumo"');

  connection.query('SELECT * FROM tipo_insumo' ,
   (error, results) => {
    if (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
      return;
    }

    res.json({
      success: true,
      metadata: {
        Total_Datos: results.length,
      },
      data: results
    });
  });
}

export function initialTipe_producto(req, res){
  console.log('¬¬ Entrada en: "/initialTipe_Insumo"');

  connection.query('SELECT * FROM tipo_producto' ,
   (error, results) => {
    if (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
      return;
    }

    res.json({
      success: true,
      metadata: {
        Total_Datos: results.length,
      },
      data: results
    });
  });
}


export function informInvInsumos(req, res) {
  console.log('Entrada en /Generar informe de insumos');

  const {desde, hasta} = req.body;

  connection.query(`SELECT ii.fk_tipo_insumo, COUNT(ii.fk_tipo_insumo) as unidades, ii.peso_insumo, ii.fk_estado, ii.estado_registro, 
  em.nombre_empresa,
  --   GROUP_CONCAT(IFNULL(dp.nombre_1, ''), ' ', IFNULL(dp.nombre_2, ''), ' ', IFNULL(dp.apellido_1, ''), ' ', IFNULL(dp.apellido_2, '')) as proveedor,
    us.alias
    FROM inventario_insumos ii
    inner join usuarios us on ii.fk_usuario = us.id_usuario
    inner join proveedores pr on ii.fk_proveedor = pr.fk_id_proveedor and ii.fk_ti_proveedor = pr.fk_ti_proveedor
    inner join empresas em on pr.fk_empresa = em.nit
    inner join datos_persona dp on ii.fk_proveedor = dp.persona_id where dp.fk_tipo_persona = 'Proveedor' and
    ii.fecha_recepcion > ? and ii.fecha_recepcion < ?
    GROUP BY fk_tipo_insumo, fk_estado, estado_registro, ii.peso_insumo, us.alias
    ORDER BY estado_registro;`, [desde, hasta], async (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: 'Error en la consulta de base de datos' });
    }
    try {
      // Cargar la plantilla Excel existente
      const workbook = await XlsxPopulate.fromFileAsync('./inf/plantilla.xlsx');
      // console.log()
      
      // Agregar los datos en las celdas específicas
      workbook.sheet(0).cell('C10').value('Tipo Insumo');
      workbook.sheet(0).cell('E10').value('Unidades');
      workbook.sheet(0).cell('G10').value('Peso Insumo');
      workbook.sheet(0).cell('I10').value('Estado');
      workbook.sheet(0).cell('K10').value('Estado Registro');
      workbook.sheet(0).cell('M10').value('Proveedor');
      workbook.sheet(0).cell('O10').value('Alias');

      // Agregar datos de la consulta en las columnas más abajo
      results.forEach((row, rowIndex) => {
        workbook.sheet(0).cell(`C${rowIndex + 11}`).value(row.fk_tipo_insumo);
        workbook.sheet(0).cell(`E${rowIndex + 11}`).value(row.unidades);
        workbook.sheet(0).cell(`G${rowIndex + 11}`).value(row.peso_insumo);
        workbook.sheet(0).cell(`I${rowIndex + 11}`).value(row.fk_estado);
        workbook.sheet(0).cell(`K${rowIndex + 11}`).value(row.estado_registro);
        workbook.sheet(0).cell(`M${rowIndex + 11}`).value(row.nombre_empresa);
        workbook.sheet(0).cell(`O${rowIndex + 11}`).value(row.alias);
      });

      // Guardar el resultado
      await workbook.toFileAsync('./inf/invinsumos/Informe_de_insumos.xlsx');

      // const doc = new PDFDocument({ size: 'letter', layout: 'landscape' });

      // doc.pipe(fs.createWriteStream('./inf/invinsumos/Informe_de_insumos.pdf'))

      // doc.fontSize(12).text('Informe de Insumos\n\n');
      // results.forEach((row) => {
      //   doc.text(`Tipo Insumo: ${row.fk_tipo_insumo}`);
      //   doc.text(`Unidades: ${row.unidades}`);
      //   doc.text(`Peso Insumo: ${row.peso_insumo}`);
      //   doc.text(`Estado: ${row.fk_estado}`);
      //   doc.text(`Estado Registro: ${row.estado_registro}`);
      //   doc.text(`Proveedor: ${row.proveedor}`);
      //   doc.text(`Alias: ${row.alias}\n\n`);
      // });

      // // Finalizar el documento PDF
      // doc.end();


      console.log('Informe generado con éxito');


      
      return res.status(200).json({
        success: true,
        metadata: {
          total_datos: results.length,
        },
        data: results,
        message: 'Informe generado con éxito',
      });
    } catch (err) {
      console.error('Error al generar el informe:', err);
      return res.status(500).json({ success: false, message: 'Error al generar el informe' });
    }
  });
}


// export function infInvInsumosView(req, res) {
//   console.log('Entrada en generar informe de inventario insumos vista');

//   const {desde, hasta} = req.body;

//   connection.query(`SELECT ii.fk_tipo_insumo, COUNT(ii.fk_tipo_insumo) as unidades, ii.peso_insumo, ii.fk_estado, ii.estado_registro, 
//   em.nombre_empresa,
//   --   GROUP_CONCAT(IFNULL(dp.nombre_1, ''), ' ', IFNULL(dp.nombre_2, ''), ' ', IFNULL(dp.apellido_1, ''), ' ', IFNULL(dp.apellido_2, '')) as proveedor,
//     us.alias
//     FROM inventario_insumos ii
//     inner join usuarios us on ii.fk_usuario = us.id_usuario
//     inner join proveedores pr on ii.fk_proveedor = pr.fk_id_proveedor and ii.fk_ti_proveedor = pr.fk_ti_proveedor
//     inner join empresas em on pr.fk_empresa = em.nit
//     inner join datos_persona dp on ii.fk_proveedor = dp.persona_id where dp.fk_tipo_persona = 'Proveedor' and
//     ii.fecha_recepcion > ? and ii.fecha_recepcion < ?
//     GROUP BY fk_tipo_insumo, fk_estado, estado_registro, ii.peso_insumo, us.alias
//     ORDER BY estado_registro`, [desde, hasta], (error, results) => {
//       if (error) {
//         console.log(error);
//         return (
//           res.status(500).json({
//             success: false,
//             message: 'NO se obtuvieron los datos correctamente',
//             error: error.message
//           })
//         )
//       }
      
//       return res.status(200).json({
//         success: true,
//         metadata: {
//           total_datos: results.length,
//         },
//         data: results,
//         message: 'Dataos obtenidos con exito',
//       });
//     })
// }

export function infInventory (req, res) {
  console.log('Entrada en generar informe de inventario');

  const {desde, hasta,tipo_informe} = req.body;
  console.log(desde, hasta, tipo_informe)

  const queryinfinumos = `SELECT ii.fk_tipo_insumo, COUNT(ii.fk_tipo_insumo) as unidades, ii.peso_insumo, ii.fk_estado, ii.estado_registro, em.nombre_empresa,
  --   GROUP_CONCAT(IFNULL(dp.nombre_1, ''), ' ', IFNULL(dp.nombre_2, ''), ' ', IFNULL(dp.apellido_1, ''), ' ', IFNULL(dp.apellido_2, '')) as proveedor,
    us.alias
    FROM inventario_insumos ii
    inner join usuarios us on ii.fk_usuario = us.id_usuario
    inner join proveedores pr on ii.fk_proveedor = pr.fk_id_proveedor and ii.fk_ti_proveedor = pr.fk_ti_proveedor
    inner join empresas em on pr.fk_empresa = em.nit
    inner join datos_persona dp on ii.fk_proveedor = dp.persona_id where dp.fk_tipo_persona = 'Proveedor' and
    ii.fecha_recepcion > ? and ii.fecha_recepcion < ?
    GROUP BY fk_tipo_insumo, fk_estado, estado_registro, ii.peso_insumo, us.alias, em.nombre_empresa
    ORDER BY estado_registro`;

  const queryinfprod = `SELECT 
    p.fk_tipo_producto AS Producto, co.color AS Color, COUNT(*) AS Cantidad, us.alias AS Usuario, tv.fecha_registro as 'Fecha Registro'
    FROM 
      transacciones_ventas tv
    JOIN productos p ON tv.fk_articulo = p.fk_tipo_producto
    JOIN inventario_produccion ip ON ip.fk_producto = p.id_producto
    JOIN colores co ON co.color = ip.fk_color
    JOIN usuarios us ON us.id_usuario = ip.fk_usuario
    where ip.fecha_registro > ? and ip.fecha_registro < ?
    GROUP BY 
    p.fk_tipo_producto, co.color, 
      us.alias, tv.fecha_registro;`;

  if (parseInt(tipo_informe) === 1) {
    connection.query(queryinfinumos, [desde, hasta], (error, results) => {
      if (error){
        console.log(error);
        return res.status(500).json({
          success: false, 
          message: 'Error al generar informe',
          error: error.message
        });
      }
      console.log(results)
      return res.status(200).json({
        success: true,
        metadata: {
          total_datos: results.length,
        },
        data: results,
        message: 'Informe generado correctamente',
      });
    });
  } else if (parseInt(tipo_informe) === 2) {
    connection.query(queryinfprod, [desde, hasta], (error, results) => {
      if (error){
        console.log(error);
        return res.status(500).json({
          success: false, 
          message: 'Error al generar informe',
          error: error.message
        });
      }
      console.log(results)
      return res.status(200).json({
        success: true,
        metadata: {
          total_datos: results.length,
        },
        data: results,
        message: 'Informe generado correctamente',
      });
    });
  }

}