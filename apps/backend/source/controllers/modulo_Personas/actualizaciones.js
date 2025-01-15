
//Importar Conexión de DB
import connection from '../../database/conexion.js';

export const updateclient = (req, res) =>{
    console.log('¬¬ Entrada en: "controllers/actualizaciones-updateclient.js"');
    
    //Recuperar Datos Formulario
    const {id, nombres, apellidos, telefono, direccion, email, nit, empresa, desc_empresa } = req.body;
    console.log(id, nombres, apellidos, telefono, direccion, email, nit, empresa, desc_empresa )
    const nombre1 = nombres.split(" ")[0];
    const nombre2 = nombres.split(" ")[1];
    const apellido1 = apellidos.split(" ")[0];
    const apellido2 = apellidos.split(" ")[1];
    
    const updatesqlc = `update datos_persona set nombre_1 = ?, nombre_2 = ?, apellido_1 = ?, apellido_2  = ?,
    telefono  = ?, direccion  = ?, correo = ? where fk_tipo_persona = 'cliente' AND persona_id = ?;`;

    const updatesqle = `update empresas set nombre_empresa = ?, descripcion_empresa = ? where nit = ?`;

    connection.query(updatesqlc, [nombre1, nombre2, apellido1, apellido2, telefono, direccion, email, id],
    (error, results)=>{
        if(error){
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error al editar proveedor',
                error: error.message
            });
            return;
        }

        else{
            console.log('Datos Persona Actualizados');
            console.log(nombre1, nombre2, apellido1, apellido2, telefono, direccion, email, id),
            console.log(empresa, desc_empresa, nit)
            connection.query(updatesqle, [empresa, desc_empresa, nit],
            (error1, results1)=>{
                if(error1){
                    console.log(error1);
                    return;
                }
                res.status(200).json({
                    success: true,
                    message: 'Cliente editado correctamente',
                    info: results1.info
                });

                console.log('Datos Empresa Actualizados');
                // res.redirect('/clientes');
            });
        }
    });
};


export const updateProvider = (req, res) => {
    console.log('Entrada a editar proveedor');

    const { nombres, apellidos, telefono, direccion, email } = req.body;

    const id = req.params.id;

    // console.log(id, nombres, apellidos, telefono, direccion, email)

    const nombre1 = nombres.split(" ")[0];
    const nombre2 = nombres.split(" ")[1];
    const apellido1 = apellidos.split(" ")[0];
    const apellido2 = apellidos.split(" ")[1];

    // Recuperar datos del formulario
    const updatesql = `UPDATE datos_persona SET
        nombre_1 = ?, nombre_2 = ?, apellido_1 = ?, apellido_2  = ?,
        telefono  = ?, direccion  = ?, correo = ?
        WHERE fk_tipo_persona = 'proveedor' AND persona_id = ?`;

    connection.query(updatesql, [nombre1, nombre2, apellido1, apellido2, telefono, direccion, email, id], (error, result) => {
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
    });
};

