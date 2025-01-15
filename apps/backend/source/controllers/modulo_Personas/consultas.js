
//Importar conexión a DB
import connection from '../../database/conexion.js';


export function initialView_users(req, res){
    console.log('¬¬ Entrada en: "controllers/view_users"');
    

    connection.query(`
    SELECT up.fk_usuario as usuario_id, GROUP_CONCAT(p.permiso_sistema) as permisos, u.alias, dp.* 
    FROM usuarios u 
    JOIN datos_persona dp ON persona_id = fk_id_empleado AND fk_ti_empleado = fk_tipo_identificacion 
    RIGHT JOIN usuario_permiso up ON fk_usuario = id_usuario 
    LEFT JOIN permisos p ON fk_permiso = id_permiso 
    WHERE u.estado_usuario = 1
    GROUP BY usuario_id, u.alias, dp.persona_id 
    ORDER BY usuario_id DESC;
    `,
    (error, results)=>{
        if(error){
            console.log(error);
            res.json( {success: false, message: error.message} );
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


export function initialView_clients(req, res){
    console.log('¬¬ Entrada en: "controllers/view_clientes"');

    
    connection.query('SELECT dp.*, e.* FROM clientes c INNER JOIN datos_persona dp ON persona_id = fk_id_cliente and fk_tipo_identificacion = fk_ti_cliente LEFT JOIN tipo_identificacion ti ON tipo_id = fk_tipo_identificacion JOIN empresas e ON nit = fk_empresa where estado_cliente = 1  ORDER BY dp.fecha_registro DESC;',
    (error, results)=>{
        if(error){
            console.log(error);
            res.json( {success: false, message: error.message} );
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


export function initialView_providers(req, res){
    console.log('¬¬ Entrada en: "controllers/view_providers"');


    connection.query('SELECT ti.tipo_id, dp.persona_id, dp.nombre_1, COALESCE(dp.nombre_2, "") AS nombre_2, dp.apellido_1, COALESCE(dp.apellido_2, "") AS apellido_2, dp.telefono, dp.correo, e.NIT, e.nombre_empresa, e.descripcion_empresa, dp.direccion FROM proveedores pr INNER JOIN datos_persona dp ON persona_id = fk_id_proveedor and fk_tipo_identificacion = fk_ti_proveedor LEFT JOIN tipo_identificacion ti ON tipo_id = fk_tipo_identificacion JOIN empresas e ON nit = fk_empresa where pr.estado_proveedor = 1 ORDER BY dp.fecha_registro DESC;',
    (error, results)=>{
        if(error){
            console.log(error);
            res.json( {success: false, message: error.message} );
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


export function initial_Permisos(req, res){
    console.log('¬¬ Entrada en: "/initial_Permisos"')
  
    connection.query('SELECT permiso_sistema FROM permisos' ,
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


export function initial_tipo_identificacion(req, res){
  console.log('¬¬ Entrada en: "/initial_tipo_identificacion"')

  connection.query('SELECT * FROM tipo_identificacion' ,
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