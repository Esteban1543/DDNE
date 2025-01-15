
//Importar Conexión de DB
import connection from '../../database/conexion.js';
import { eliminarArchivo } from '../../helpers/EliminarArchivo.js';


// export const newProduct = async (req, res) => {
//     try{
//         const [data] = req.body;

        
//     }catch(error){
//         console.error(`Error al crear un prodcuto: ${error}`);
//     }
// }


export const newTransaccion = (req, res, next) => {
    console.log('¬¬ Entrada en: "/registro-transaccion.js"');

    const { tipoTransaccion, tipo_factura, tipo_insumo, precio, tipo_persona } = req.body;
    const [fk_doc, fk_tipo_doc] = tipo_persona.split(' ')
    const fecha_registro = new Date().toISOString().split("T")[0];

    // console.log(tipo_persona, datos_persona, datos_persona[0], datos_persona[1]);

    const archivo = req.file;
    const filename = archivo.filename;

    console.log(archivo.path)

    if (tipoTransaccion === 'Venta') {
        connection.query('INSERT INTO transacciones_ventas SET ?', {fk_tipo_transaccion: tipoTransaccion, fk_tipo_documento: tipo_factura, fk_articulo: tipo_insumo, fk_cliente: fk_doc, fk_t_identi: fk_tipo_doc, fecha_registro: fecha_registro, precio: precio, comprobante: filename},
        (error, results)=>{
            if(error){
                eliminarArchivo(archivo.path);
                console.log(error.message);
                res.json({
                    success: false,
                    message: error.message,
                });
                return;
            }else{
                console.log('Registro Exitoso en Transacciones Ventas!!');
                res.json({
                    success: true,
                    message: '✅ Registro Exitoso en Transacciones Ventas!!',
                });
            }
        })
    }

    if(tipoTransaccion === 'Compra') {
        connection.query('INSERT INTO transacciones_compras SET ?',{fk_tipo_transaccion: tipoTransaccion, fk_tipo_documento: tipo_factura, fk_articulo: tipo_insumo, fk_proveedor:fk_doc, fk_t_identi:fk_tipo_doc, fecha_registro: fecha_registro, precio:precio, comprobante: filename},
        (error, results)=>{
            if(error){
                eliminarArchivo(archivo.path);
                console.log(error.message);
                res.json({
                    success: false,
                    message: error.message,
                });
                return;
            }else{
                console.log('Registro Exitoso en Transacciones Compras!!');
                res.json({
                    success: true,
                    message: '✅ Registro Exitoso en Transacciones Compras!!',
                });
            }
        }); 
    }
    
}


//PREVISUALISAR PDF