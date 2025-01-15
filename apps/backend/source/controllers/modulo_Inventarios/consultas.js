
//♨️ Importar conexión a DB
import connection from '../../database/conexion.js';

//🔸 Función para Obtener registros de Inv - Insumos
export function initialView_invInsumos(req, res) {
    console.log('➡️  Entrada en: /inv-insumos');

    const consulta_sql = `SELECT ii.*, u.alias, e.nombre_empresa 
        FROM inventario_insumos ii 
        JOIN usuarios u ON fk_usuario = id_usuario 
        JOIN proveedores p ON fk_proveedor = fk_id_proveedor and ii.fk_ti_proveedor = p.fk_ti_proveedor 
        LEFT JOIN empresas e ON fk_empresa = nit 
        WHERE estado_registro = 1 
        ORDER BY id_inventario_insumos DESC`;

    connection.query(consulta_sql, (error, results) => {
        if (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message: 'Error interno del servidor al obtener registros de inventario de insumos',
                error: error.message
            });
            return;
        }


        res.json({
            success: true,
            metadata: {
                total_datos: results.length,
            },
            data: results
        });
    }
    );
}


//🔸 Función para Obtener registros de Inv - Rollos Medianos
export function initialView_rollosMedianos(req, res) {
    console.log('➡️  Entrada en: /inv-medianos');

    const consulta_sql = `SELECT rm.*, COALESCE(MAX(cj.rollo_jumbo), 0) AS corte_jumbo, ii.consecutivo_insumo, u.alias 
        FROM rollos_medianos rm 
        INNER JOIN inventario_insumos ii ON fk_insumo = id_inventario_insumos 
        LEFT JOIN cortes_jumbo cj ON pfk_rollo_mediano = id_rollos_medianos
        INNER JOIN usuarios u ON rm.fk_usuario = u.id_usuario    
        WHERE rm.estado_registro = 1
        GROUP BY rm.id_rollos_medianos
        ORDER BY id_rollos_medianos DESC`;

    connection.query(consulta_sql, (error, results) => {
        if (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message: 'Error interno del Servidor al obtener de inventario de ',
                error: error.message
            });
            return;
        }

        res.json({
            success: true,
            metadata: {
                total_datos: results.length,
            },
            data: results
        });
    });
}


//🔸 Función para Obtener 1 registro de Inv - Rollos Jumbo
export function initialView_rollosJumbo_id(req, res) {
    console.log('➡️  Entrada en: /inv-jumbos:id');

    const id = req.params.idRolloMediano;

    const consulta_sql = `SELECT *, 
        (SELECT sum(peso_jumbo) FROM cortes_jumbo WHERE pfk_rollo_mediano = ?) as peso_corte_total 
        FROM cortes_jumbo 
        WHERE pfk_rollo_mediano = ? AND estado_registro = 1`;

    connection.query(consulta_sql, [id, id], (error, results) => {
        if (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message: 'Error interno del Servidor al obtener de inventario de ',
                error: error.message
            });
            return;
        }

        res.json({
            success: true,
            metadata: {
                total_datos: results.length,
            },
            data: results
        });
    })
}


//🔸 Función para Obtener registros de Inv - Rollos Jumbo
export function initialView_rollosJumbo(req, res) {
    console.log('➡️  Entrada en: /inv-jumbos');

    const consulta_sql = `SELECT cj.*, u.alias 
        FROM cortes_jumbo cj
        INNER JOIN usuarios u ON cj.fk_usuario = u.id_usuario 
        WHERE cj.estado_registro = 1
        ORDER BY pfk_rollo_mediano DESC, rollo_jumbo DESC`;

    connection.query(consulta_sql, (error, results) => {
        if (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message: 'Error interno del Servidor al obtener de inventario de ',
                error: error.message
            });
            return;
        }

        res.json({
            success: true,
            metadata: {
                total_datos: results.length,
            },
            data: results
        });
    })
}


//🔸 Función para Obtener 1 registro de Inv - Producción
export function initialView_invProduccion_id(req, res) {
    console.log('➡️  Entrada en: /inv-produccion/id/id');

    const { idRolloMediano, idRolloJumbo } = req.params;

    const consulta_sql = `SELECT ip.id_inv_produccion, ip.fecha_registro, ii.consecutivo_insumo, rm.peso as peso_inicial, concat(ip.fk_rollo_mediano, ip.fk_rollo_jumbo) as id_rollo_jumbo, p.fk_tipo_producto, ip.fk_color, pr.unidad_medida, ip.peso_producto, (select peso_jumbo from cortes_jumbo where pfk_rollo_mediano=ip.fk_rollo_mediano and rollo_jumbo= ip.fk_rollo_jumbo) as peso_jumbo, u.alias, ip.estado_registro 
        FROM inventario_produccion ip 
        INNER JOIN cortes_jumbo c ON fk_rollo_mediano = pfk_rollo_mediano and fk_rollo_jumbo = rollo_jumbo 
        LEFT JOIN rollos_medianos rm ON fk_rollo_mediano = id_rollos_medianos INNER JOIN inventario_insumos ii  ON fk_insumo = id_inventario_insumos 
        JOIN productos p ON fk_producto = id_producto 
        LEFT JOIN precios_productos pr ON p.fk_precio = pr.id_precios 
        JOIN usuarios u ON ip.fk_usuario = id_usuario
        WHERE ip.fk_rollo_mediano = ? and ip.fk_rollo_jumbo = ? AND ip.estado_registro = 1`;

    connection.query(consulta_sql, [idRolloMediano, idRolloJumbo], (error, results) => {
        if (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message: 'Error interno del Servidor al obtener de inventario de ',
                error: error.message
            });
            return;
        }

        res.json({
            success: true,
            metadata: {
                total_datos: results.length,
            },
            data: results,
        });

    });

}


//🔸 Función para Obtener registros de Inv - Producción
export function initialView_invProduccion(req, res) {
    console.log('➡️  Entrada en: /inv-produccion');

    const consulta_sql = `
    SELECT ip.id_inv_produccion, ip.fecha_registro, ii.consecutivo_insumo, rm.peso as peso_inicial, concat(ip.fk_rollo_mediano, ip.fk_rollo_jumbo) as id_rollo_jumbo, p.id_producto, p.fk_tipo_producto, ip.fk_color, ip.peso_producto, pr.id_precios, pr.unidad_medida, pr.medida, pr.cantidad, pr.descripcion as tipo_medicion, FORMAT(pr.precio , 3) as precio, (select peso_jumbo from cortes_jumbo where pfk_rollo_mediano=ip.fk_rollo_mediano and rollo_jumbo= ip.fk_rollo_jumbo) as peso_jumbo, u.alias, ip.estado_registro  
    FROM inventario_produccion ip 
    INNER JOIN cortes_jumbo c ON fk_rollo_mediano = pfk_rollo_mediano and fk_rollo_jumbo = rollo_jumbo 
    LEFT JOIN rollos_medianos rm ON fk_rollo_mediano = id_rollos_medianos 
    INNER JOIN inventario_insumos ii  ON fk_insumo = id_inventario_insumos 
    JOIN productos p ON fk_producto = id_producto 
    LEFT JOIN precios_productos pr ON p.fk_precio = pr.id_precios 
    JOIN usuarios u ON ip.fk_usuario = id_usuario 
    WHERE ip.estado_registro = 1 and peso_producto = '0.00'
    
    UNION
    
    SELECT ip.id_inv_produccion, ip.fecha_registro, ii.consecutivo_insumo, rm.peso as peso_inicial, concat(ip.fk_rollo_mediano, ip.fk_rollo_jumbo) as id_rollo_jumbo, p.id_producto, p.fk_tipo_producto, ip.fk_color, ip.peso_producto, pr.id_precios, pr.unidad_medida, pr.medida, pr.cantidad, pr.descripcion as tipo_medicion, FORMAT((pr.precio * ip.peso_producto) , 3) as precio, (select peso_jumbo from cortes_jumbo where pfk_rollo_mediano=ip.fk_rollo_mediano and rollo_jumbo= ip.fk_rollo_jumbo) as peso_jumbo, u.alias, ip.estado_registro 
    FROM inventario_produccion ip 
    INNER JOIN cortes_jumbo c ON fk_rollo_mediano = pfk_rollo_mediano and fk_rollo_jumbo = rollo_jumbo 
    LEFT JOIN rollos_medianos rm ON fk_rollo_mediano = id_rollos_medianos 
    INNER JOIN inventario_insumos ii  ON fk_insumo = id_inventario_insumos 
    JOIN productos p ON fk_producto = id_producto 
    LEFT JOIN precios_productos pr ON p.fk_precio = pr.id_precios 
    JOIN usuarios u ON ip.fk_usuario = id_usuario 
    WHERE ip.estado_registro = 1 and pr.descripcion LIKE '%por kg'
    ORDER BY id_inv_produccion DESC;
    `;

    connection.query(consulta_sql, (error, results) => {
        if (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message: 'Error interno del Servidor al obtener de inventario de ',
                error: error.message
            });
            return;
        }

        res.json({
            success: true,
            metadata: {
                total_datos: results.length,
            },
            data: results,
        });

    });
}