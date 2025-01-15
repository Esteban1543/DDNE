//Importar Conexión de DB
import connection from "../../database/conexion.js";

//Encriptación
import bcrypt from "bcrypt";


export const newUser = async (req, res) => {
  console.log('¬¬ Entrada en: "controllers/nuevo-usuario.js"');

  // Fecha Pc
  const fecha_GMT = new Date();
  fecha_GMT.setHours(fecha_GMT.getHours() - 5); //Ajuste a Zona Horaria Colombiana

  const fecha_registro = fecha_GMT.toISOString().split('T')[0];
  const hora_registro = fecha_GMT.toISOString().split('T')[1].split('.')[0];

  try {
    //Recuperar Datos Formulario
    
    const id = req.body.n_identificacion;
    const tipo_id = req.body.t_identificacion;
    const telefono = req.body.telefono;
    const direccion = req.body.direccion;
    const email = req.body.email;
    const alias = req.body.usuario; 
    const permisos = req.body.permisos.split(" ");
    console.log(permisos)

    const nombre1 = req.body.nombres.split(" ")[0];
    const nombre2 = req.body.nombres.split(" ")[1];
    const apellido1 = req.body.apellidos.split(" ")[0];
    const apellido2 = req.body.apellidos.split(" ")[1];
    const tipo_persona = "Empleado"; //Por Defecto

    //////////////// Generar encriptación ///////////////////////
    //                                  Bcrypt-Hash-Salt //////
    const password = req.body.contraseña;
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const hashPassword = await bcrypt.hash(password, salt);
    ////////////////////////////////////////////////////////////

    connection.query(
      "INSERT INTO datos_persona SET ?",
      {
        persona_id: id,
        fk_tipo_identificacion: tipo_id,
        nombre_1: nombre1,
        nombre_2: nombre2,
        apellido_1: apellido1,
        apellido_2: apellido2,
        telefono: telefono,
        direccion: direccion,
        correo: email,
        fk_tipo_persona: tipo_persona,
        fecha_registro: `${fecha_registro} ${hora_registro}`
      },
      (error, results) => {
        if (error) {
          console.log(error);
          return;
        }

        connection.query(
          "INSERT INTO usuarios SET ?",
          {
            alias: alias,
            contrasena: hashPassword,
            fk_id_empleado: id,
            fk_ti_empleado: tipo_id,
            estado_usuario: 1,
          },
          (error1, results1) => {
            if (error1) {
              console.log(error1);
              return;
            }
            console.log("Usuario Creado!");

            connection.query(
              "SELECT * FROM usuarios WHERE alias = ?",
              [alias],
              (error2, results2) => {
                if (error2) {
                  console.log(error2);
                  return;
                }
                const idUsuarioNuevo = results2[0].id_usuario;
                console.log(idUsuarioNuevo)
                // console.log(idUsuarioNuevo + ' id usuario nuevo');
                // console.log(`1er permiso >> ${permisos.length}`);
                const PermisosDatos = {
                  Insumos: 1,
                  Produccion: 2,
                  Transacciones: 3,
                  Informes: 4,
                  Productos: 5,
                  Proveedores: 6,
                  Clientes: 7,
                  Usuarios: 8
                }

                for (let i = 0; i < permisos.length; i++) {
                  connection.query(
                    "INSERT INTO usuario_permiso SET ?",
                    { fk_usuario: idUsuarioNuevo, fk_permiso: PermisosDatos[permisos[i]] },
                    (error3, results3) => {
                      if (error3) {
                        console.log(error3);
                        return;
                      }

                      console.log("Permiso " + permisos[i] + " asignado");
                    }
                  );
                }

                console.log("Permisos Asignados");
                res.json({
                  success: true,
                  message: "Permisos Asignados",
                });
              }
            );
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: error,
    });
  }
};

export const newClient = (req, res) => {
  console.log('¬¬ Entrada en: "controllers/nuevo-cliente.js"');

  // Fecha Pc
  const fecha_GMT = new Date();
  fecha_GMT.setHours(fecha_GMT.getHours() - 5); //Ajuste a Zona Horaria Colombiana

  const fecha_registro = fecha_GMT.toISOString().split('T')[0];
  const hora_registro = fecha_GMT.toISOString().split('T')[1].split('.')[0];

  //Recuperar Datos Formulario
  const {
    identificacion,
    tipo_id,
    nombres,
    apellidos,
    telefono,
    direccion,
    email,
    nit,
    empresa,
    descEmpresa,
  } = req.body;

  const nombre1 = nombres.split(" ")[0];
  const nombre2 = nombres.split(" ")[1];
  const apellido1 = apellidos.split(" ")[0];
  const apellido2 = apellidos.split(" ")[1];
  // const estadoCliente = 1;
  const tipo_persona = "Cliente"; //Por Defecto

  connection.query(
    "INSERT INTO datos_persona SET ?",
    {
      persona_id: identificacion,
      fk_tipo_identificacion: tipo_id,
      nombre_1: nombre1,
      nombre_2: nombre2,
      apellido_1: apellido1,
      apellido_2: apellido2,
      telefono: telefono,
      direccion: direccion,
      correo: email,
      fk_tipo_persona: tipo_persona,
      fecha_registro: `${fecha_registro} ${hora_registro}`
    },
    (error, results) => {
      if (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          message: 'Error en Datos Persona',
          error: error.message
        });
        return
      } else {
        connection.query(
          "INSERT INTO empresas SET ?",
          {
            nit: nit,
            nombre_empresa: empresa,
            descripcion_empresa: descEmpresa,
          },
          (error1, results1) => {
            if (error1) {
              console.log(error1);
              res.status(400).json({
                success: false,
                message: 'Error en Datos Empresa',
                error: error1.message
              });
              return
            } else {
              connection.query(
                "INSERT INTO clientes SET ?",
                {
                  fk_id_cliente: identificacion,
                  fk_ti_cliente: tipo_id,
                  fk_empresa: nit,
                  estado_cliente: 1
                },
                (error2, results2) => {
                  if (error2) {
                    console.log(error2);
                    res.status(400).json({
                      success: false,
                      message: 'Error al Insertar en Clientes',
                      error: error2.message
                    });
                    return
                  } else {
                    console.log("Cliente Creado!");
                    res.json({
                      success: true,
                      message: "Cliente Creado!",
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};

export const newProvider = (req, res) => {
  console.log('¬¬ Entrada en: "controllers/nuevo-proveedor.js"');

  // Fecha Pc
  const fecha_GMT = new Date();
  fecha_GMT.setHours(fecha_GMT.getHours() - 5); //Ajuste a Zona Horaria Colombiana

  const fecha_registro = fecha_GMT.toISOString().split('T')[0];
  const hora_registro = fecha_GMT.toISOString().split('T')[1].split('.')[0];

  //Recuperar Datos Formulario
  const {
    identificacion,
    tipo_id,
    nombres,
    apellidos,
    telefono,
    direccion,
    email,
    nit,
    empresa,
    descEmpresa,
  } = req.body;

  const nombre1 = nombres.split(" ")[0];
  const nombre2 = nombres.split(" ")[1];
  const apellido1 = apellidos.split(" ")[0];
  const apellido2 = apellidos.split(" ")[1];
  const tipo_persona = "Proveedor"; //Por Defecto


  console.log({
    identificacion,
    tipo_id,
    nombres,
    apellidos,
    telefono,
    direccion,
    email,
    nit,
    empresa,
    descEmpresa,
    fecha_registro,
    hora_registro
  })

  connection.query(
    "INSERT INTO datos_persona SET ?",
    {        
      persona_id: identificacion,
      fk_tipo_identificacion: tipo_id,
      nombre_1: nombre1,
      nombre_2: nombre2,
      apellido_1: apellido1,
      apellido_2: apellido2,
      telefono: telefono,
      direccion: direccion,
      correo: email,
      fk_tipo_persona: tipo_persona,
      fecha_registro: `${fecha_registro} ${hora_registro}`
    },(error, results) => {
      if (error) {
        console.log(error);
        res.status(400).json({
          success: false,
          message: 'Error en Datos Persona',
          error: error.message
        });
        return
      } else {
        connection.query(
          "INSERT INTO empresas SET ?",
          {
            nit: nit,
            nombre_empresa: empresa,
            descripcion_empresa: descEmpresa,            
          },
          (error1, results1) => {
            if (error1) {
              console.log(error1);
              res.status(400).json({
                success: false,
                message: 'Error en Datos Empresa',
                error: error1.message
              });
              return
            } else {
              connection.query(
                "INSERT INTO proveedores SET ?",
                {
                  fk_id_proveedor: identificacion,
                  fk_ti_proveedor: tipo_id,
                  fk_empresa: nit,
                  estado_proveedor: 1
                },
                (error2, results2) => {
                  if (error2) {
                    console.log(error2);
                    res.status(400).json({
                      success: false,
                      message: 'Error al Insertar en Proveedores',
                      error: error2.message
                    });
                    return
                  } else {
                    console.log("Proveedor Creado!");
                    res.json({
                      success: true,
                      message: "Proveedor Creado!",
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
};
