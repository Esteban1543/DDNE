
//Importar Conexión de DB
import connection from '../../database/conexion.js';


// Funcion de eliminar proveedores
export function Deleteprovider (req, res) {

    const id = req.params.id;

    console.log(id);

    const eliminarsql =`update proveedores set estado_proveedor = ? where fk_id_proveedor = ?;`

    connection.query(eliminarsql, [ 0, id ], (error, resul) =>{
        if (error){
            console.log('Error al eliminar Proveedor', error);

            res.status(500).json({
                success: false,
                message: 'Error al eliminar proveedor',
                error: error.message,
            });
        return;
        }

        res.json({
            success: true,
            message: 'Proveedor eliminado correctamente',
            info: resul.info
        })
    })
}

export function DeleteClient (req, res) {
    console.log('Entando a eliminar cliente')

    const id = req.params.id;

    console.log(id)

    const eliminarsql = `update clientes set estado_cliente = 0 where fk_id_cliente = ?;`

    connection.query(eliminarsql, [id], (error, result) => {
        if (error) {
            console.log('Error al eliminar cliente', error)

            res.status(500).json({
                success: false, 
                message: 'Error al eliminar cliente',
                error: error.message,
            });
            return;
        }
        res.json({
            success: true,
            message: 'Cliente eliminado correctamente',
            info: result.info
        })
    })
}

export const delete_Usuario = (req, res) => {
    console.log('Entrada a desactivar Usuario')
    const id = req.params.id;

    connection.query(`
    UPDATE usuarios
    SET estado_usuario = 0
    WHERE id_usuario = ?;
    `,[id],  (error, result) => {
        if (error) {
            console.log('Error al editar proveedor');

            res.status(500).json({
                success: false,
                message: 'Error al editar proveedor',
                error: error.message
            });
            return;
        }

        res.json({
            success: true,
            message: 'Proveedor editado correctamente',
            info: result.info
        });
    })
}