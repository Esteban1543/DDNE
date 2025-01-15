
//♨️ Importar Conexión de DB
import connection from '../database/conexion.js';

//♨️ Encriptación
import bcrypt from 'bcrypt';


export function login(req, res) {
    console.log('➡️  Entrada en: /login');

    //🔸 Recuperar Datos del Formulario
    const { usuario, password } = req.body;

    try {
        const consulta_sql = `SELECT u.id_usuario, u.alias, u.contrasena, dp.nombre_1, dp.apellido_1, GROUP_CONCAT(p.permiso_sistema) as permisos 
            FROM usuarios u JOIN datos_persona dp ON persona_id=fk_id_empleado AND fk_ti_empleado=fk_tipo_identificacion 
            RIGHT JOIN usuario_permiso up ON fk_usuario = id_usuario 
            LEFT JOIN permisos p ON fk_permiso = id_permiso 
            WHERE alias = ?
            GROUP BY id_usuario, u.alias, dp.persona_id`
        ;

        connection.query(consulta_sql, [usuario], async (error, results) => {

            if (error) {
                console.error(error);

                res.status(500).json({
                    success: false,
                    message: 'Error interno del servidor al Realizar Login',
                    error: error.message
                });
                return;
            }

            if (results.length > 0) {
                const password_DB = results[0].contrasena;

                //🔹 Verificar de Acuerdo al hash de la DB
                if (await bcrypt.compare(password, password_DB)) {

                    //🔹Crear sesión
                    const id_usuario = results[0].id_usuario.toString();
                    const nombres = results[0].nombre_1 + ' ' + results[0].apellido_1;
                    const permisos = results[0].permisos;

                    const session = req.session.user = { 
                        id_user: id_usuario,
                        username: usuario,
                        names: nombres, 
                        allowed: permisos
                    };
                    console.log('-- 📚 Información de la sesión: ', req.session, '>>>>>>>>>>>> Sesión Activa >>>>>>>>>>');

                    //🔹 Crear Cookie
                    res.cookie('UsuarioActivo', session, {
                        path: '/',
                        domain: 'localhost',
                        sameSite: 'none',
                        secure: true
                    });

                    const userCookie = res.getHeader('set-cookie');
                    console.log('Cookie establecida:', res.getHeader('set-cookie')); //verificar cookie

                    res.json({
                        success: true,
                        message: 'Sesión Iniciada',
                        cookie: { userCookie },
                        user: { session }
                    });

                } else {
                    console.log('Contraseña Incorrecta❗');

                    res.status(401).json({
                        success: false,
                        message: 'Contraseña Incorrecta❗',
                    });
                }
            } else {
                console.log('❌ Usuario no encontrado');

                res.status(401).json({
                    success: false,
                    message: '❌ Usuario no encontrado ',
                });
            }
        }
        );
    }
    catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Error interno del servidor al Realizar Consulta a Login',
            error: error.message
        });
    };
}
