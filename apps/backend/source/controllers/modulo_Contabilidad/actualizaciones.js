
//Importar Conexión de DB
import connection from '../../database/conexion.js';

// USAR ECS6 PARA MODULOS EN VEZ DE COMMONJS

export const editarProducto = (req, res) => {
    try{
        console.log('Entrar edit_productos')

        const { comentario } = req.body;
        const { id } = req.params;

        console.log(`${comentario} ${id}`)

        connection.query(
            `
            UPDATE productos
            SET comentario = ?
            WHERE id_producto = ?;
            `,
            [comentario, id],
            (error, results, fields) => {
                if (error) {
                    console.error(`Error en la actualizacion: ${error}`);
                    res.status(500).json({ mensaje: 'Error en la actualización' });
                } else {
                    console.log('Comentario actualizado correctamente');
                    res.status(200).json({ mensaje: 'Se actualizó el comentario', id });
                }
            }
        );
        
    }catch(err){
        console.error(`Error en la actualizacion: ${err}`);   
    }
}

export const update_Transacciones = (req, res) => {
    console.log('Entrar update_Transacciones')
    
    const datosTransaccion = req.body;

    console.log(datosTransaccion);
    
    const [fk_persona, fk_t_identi] = datosTransaccion.persona.split(' ');

    console.log(fk_persona, fk_t_identi)
    if (datosTransaccion.tp_transaccion === 'Venta') {
        console.log('Se creo correctamente la transaccion venta')
        connection.query(
            `
            UPDATE transacciones_ventas
            SET
                fk_tipo_documento = ?,
                fk_articulo = ?,
                precio = ?,
                fk_cliente = ?,
                fk_t_identi = ?
            WHERE
                id_transacciones = ?;
            `,
            [datosTransaccion.doc_transaccion, datosTransaccion.articulo, datosTransaccion.precio, fk_persona, fk_t_identi, datosTransaccion.id],
            (error, results)=>{
                if(error){
                    console.log(error);
                    res.json({
                        success: false,
                        message: error,
                    });
                    return;
                }else{
                    console.log('Registro Exitoso en Transacciones Ventas!!');
                    res.json({
                        success: true,
                        message: '✅ Registro Exitoso en Transacciones Ventas!!',
                    });
                }
            }
        )
    }else if(datosTransaccion.tp_transaccion === 'Compra') {
        console.log('Se creo correctamente la transaccion compra')
        connection.query(
            `
            UPDATE transacciones_compras
            SET
                fk_tipo_documento = ?,
                fk_articulo = ?,
                fk_proveedor = ?,
                fk_t_identi = ?,
                precio = ?
            WHERE
                id_transacciones = ?;
            `,
            [datosTransaccion.doc_transaccion, datosTransaccion.articulo, fk_persona, fk_t_identi, datosTransaccion.precio, datosTransaccion.id],
            (error, results)=>{
                if(error){
                    console.log(error);
                    res.json({
                        success: false,
                        message: error,
                    });
                    return;
                }else{
                    console.log('Registro Exitoso en Transacciones Ventas!!');
                    res.json({
                        success: true,
                        message: '✅ Registro Exitoso en Transacciones Ventas!!',
                    });
                }
            }
        )
    }
} 