
//Personas

/*/////////////////
  Endpoints GET🌐
////////////////*/

/**
 * @openapi
 * /proveedores:
 *   get:
 *     summary: Obtener los registros de Proveedores
 *     tags:
 *       [Ⓜ️ Personas]
 *     responses:
 *       200:
 *         description: Lista de Proveedores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 metadata:
 *                  type: object
 *                  properties:
 *                    total_datos:
 *                      type: number
 *                      example: 1
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *       5xx:
 *         description: Error en la Solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: 
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 */

/**
 * @openapi
 * /clientes:
 *   get:
 *     summary: Obtener los registros de Clientes
 *     tags:
 *       [Ⓜ️ Personas]
 *     responses:
 *       200:
 *         description: Lista de Clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 metadata:
 *                  type: object
 *                  properties:
 *                    total_datos:
 *                      type: number
 *                      example: 1
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *       5xx:
 *         description: Error en la Solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: 
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 */

/**
 * @openapi
 * /usuarios:
 *   get:
 *     summary: Obtener los registros de Usuarios con permisos
 *     tags:
 *       [Ⓜ️ Personas]
 *     responses:
 *       200:
 *         description: Lista de Usuarios con sus respectivos permisos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 metadata:
 *                  type: object
 *                  properties:
 *                    total_datos:
 *                      type: number
 *                      example: 1
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *       5xx:
 *         description: Error en la Solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: 
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 */

/**
 * @openapi
 * /tipo_identificacion:
 *   get:
 *     summary: Obtener vista inicial de tipos de identificación
 *     tags:
 *       [Ⓜ️ Personas]
 *     responses:
 *       '200':
 *         description: Vista inicial de tipos de identificación obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     Total_Datos:
 *                       type: number
 *                       example: 5
 *                 data:
 *                   type: array
 *                   items:
 *       '5xx':
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al obtener la vista inicial de tipos de identificación
 */

/**
 * @openapi
 * /permisos:
 *   get:
 *     summary: Obtener vista inicial de permisos del sistema
 *     tags:
 *       [Ⓜ️ Personas]
 *     responses:
 *       '200':
 *         description: Vista inicial de permisos del sistema obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 metadata:
 *                   type: object
 *                   properties:
 *                     Total_Datos:
 *                       type: number
 *                       example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       permiso_sistema:
 *                         type: string
 *                         example: administrar_usuarios
 *       '5xx':
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al obtener la vista inicial de permisos del sistema
 */


/*/////////////////
  Endpoints POST🌐
////////////////*/

/**
 * @openapi
 * /createprovider:
 *   post:
 *     summary: Crear registro de proveedor
 *     tags:
 *       [Ⓜ️ Personas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Proveedor creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type: boolean
 *                 example: true
 *               metadata:
 *                 type: object
 *                 properties:
 *                   total_datos:
 *                     type: number
 *                     example: 1
 *                 data: 
 *                   type: array
 *                   items:
 *                     type: object
 *       5xx:
 *         description: Error en la Solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: 
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 */

/**
 * @openapi
 * /createuser:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags:
 *       [Ⓜ️ Personas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               n_identificacion:
 *                 type: string
 *                 description: Número de identificación del usuario
 *               t_identificacion:
 *                 type: string
 *                 description: Tipo de identificación del usuario
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono del usuario
 *               direccion:
 *                 type: string
 *                 description: Dirección del usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario
 *               usuario:
 *                 type: string
 *                 description: Alias del usuario
 *               contrasena:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *               permisos:
 *                 type: string
 *                 description: 'Permisos del usuario separados por espacio (Ejemplo: "Insumos Produccion")'
 *               nombres:
 *                 type: string
 *                 description: Nombres del usuario
 *               apellidos:
 *                 type: string
 *                 description: Apellidos del usuario
 *     responses:
 *       '200':
 *         description: Usuario creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Permisos Asignados
 *       '5xx':
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al crear el usuario
 */

/**
 * @openapi
 * /createclient:
 *   post:
 *     summary: Crear nuevo cliente
 *     tags:
 *       - Ⓜ️ Personas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identificacion:
 *                 type: string
 *               tipo_id:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               email:
 *                 type: string
 *               nit:
 *                 type: string
 *               empresa:
 *                 type: string
 *               descEmpresa:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Nuevo cliente creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cliente Creado!
 *       '5xx':
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al crear nuevo cliente
 */


/*/////////////////
  Endpoints PATCH🌐
////////////////*/


/**
 * @openapi
 * /updateclient:
 *   post:
 *     summary: Actualizar cliente
 *     tags:
 *       - Ⓜ️ Personas
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               email:
 *                 type: string
 *               nit:
 *                 type: string
 *               empresa:
 *                 type: string
 *               desc_empresa:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Cliente actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cliente editado correctamente
 *       '5xx':
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al editar cliente
 */

/**
 * @openapi
 * /updateProvider/{id}:
 *   put:
 *     summary: Actualizar proveedor
 *     tags:
 *       - Ⓜ️ Personas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombres:
 *                 type: string
 *               apellidos:
 *                 type: string
 *               telefono:
 *                 type: string
 *               direccion:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Proveedor actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Proveedor editado correctamente
 *       '5xx':
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al editar proveedor
 */


/*///////////////////
  Endpoints DELETE🌐
//////////////////*/

/**
 * @openapi
 * /delete_Usuario/{id}:
 *   put:
 *     summary: Desactivar un usuario por su ID
 *     tags:
 *       [Ⓜ️ Personas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario a desactivar
 *     responses:
 *       '200':
 *         description: Usuario desactivado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Usuario editado correctamente
 *                 info:
 *                   type: object
 *                   description: Información adicional sobre la edición del proveedor
 *       '5xx':
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al editar proveedor
 *                 error:
 *                   type: string
 *                   example: Mensaje de error detallado
 */

/**
 * @openapi
 * /deleteProvider/{id}:
 *   delete:
 *     summary: Eliminar proveedor
 *     tags:
 *       - Ⓜ️ Personas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del proveedor a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Proveedor eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Proveedor eliminado correctamente
 *       '5xx':
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al eliminar proveedor
 */

/**
 * @openapi
 * /deleteClient/{id}:
 *   delete:
 *     summary: Eliminar cliente
 *     tags:
 *       - Ⓜ️ Personas
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cliente eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Cliente eliminado correctamente
 *       '5xx':
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al eliminar cliente
 */

