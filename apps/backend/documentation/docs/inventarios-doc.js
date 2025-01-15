
/*/////////////////
  Endpoints GET🌐
////////////////*/

//🔸 Inventario Insumos
/**
 * @openapi
 * /inv/insumos:
 *   get:
 *     summary: Obtener todos los registros de Inventario Insumos
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     responses:
 *       200:
 *         description: Lista de Insumos registrados
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
 *                     $ref: '#/components/schemas/InventarioInsumos'
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


//🔸 Rollos Medianos
/**
 * @openapi
 * /inv/medianos:
 *   get:
 *     summary: Obtener todos los registros de Rollos Medianos
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     responses:
 *       200:
 *         description: Lista de Rollos Medianos recibidos por almacen
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
 *                     $ref: '#/components/schemas/RolloMediano'
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


//🔸 Inventario Rollos Jumbo
/**
 * @openapi
 * /inv/jumbos:
 *   get:
 *     summary: Obtener todos los registros de Rollos Jumbo
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     responses:
 *       200:
 *         description: Lista de Rollos Jumbo
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
 *                     $ref: '#/components/schemas/RolloJumbo'
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


//🔸 Inventario Rollos Jumbo por ID
/**
 * @openapi
 * /inv/jumbos/{id Rollo Mediano}:
 *   get:
 *     summary: Obtener todos los registros de Rollos Jumbos de 1 Rollo Mediano
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     parameters:
 *       - name: id Rollo Mediano
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Lista de Rollos Jumbo de 1 Rollo Mediano
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
 *                     $ref: '#/components/schemas/RolloJumbo'
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
 *     security:
 *       ddne_auth:
 *         read: registros
 */


//🔸 Inventario Producción
/**
 * @openapi
 * /inv/produccion:
 *   get:
 *     summary: Obtener todos los registros de Inventario Producción
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     responses:
 *       200:
 *         description: Lista de Inventario Producción
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
 *                     $ref: '#/components/schemas/InventarioProduccion'
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


//🔸 Inventario Producción por ID
/**
 * @openapi
 * /inv/produccion/{id Rollo Mediano}/{id Rollo Jumbo}:
 *   get:
 *     summary: Obtener 1 registro de Inventario Producción
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     parameters:
 *       - name: id Rollo Mediano
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: id Rollo Jumbo
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Lista de Rollos Jumbo de 1 Rollo Mediano
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
 *                     $ref: '#/components/schemas/InventarioProduccion'
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
 *     security:
 *       ddne_auth:
 *         read: registros
 */


/*/////////////////
  Endpoints POST🌐
////////////////*/


//🔸 Inventario Insumos
/**
 * @openapi
 * /inv/insumos:
 *   post:
 *     summary: Crear registro en Inventario Insumos
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/InventarioInsumos'
 *     responses:
 *       201:
 *         description: Registro Editado en Inventario Insumos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: array 
 *                   example: "✅ Registro Exitoso en Inventario Insumos!!"
 *       400:
 *         description: Tipo de Datos Inválidos
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
 *                   example: "Error en Tipo de Datos"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
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
 *                   example: "Error interno del servidor al crear registro de Inv - Insumos"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 *     security:
 *       ddne_auth:
 *         write: registros
 */

//🔸 Rollos Medianos
/**
 * @openapi
 * /inv/medianos:
 *   post:
 *     summary: Crear registro en Rollos Medianos
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/RolloMediano'
 *     responses:
 *       201:
 *         description: Registro Editado en Inventario Insumos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: array 
 *                   example: "✅ Registro Exitoso en Rollos Medianos!!"
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
 *                   example: "Error interno del servidor al crear registro de Rollos Medianos"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 *     security:
 *       ddne_auth:
 *         write: registros
 */

//🔸 Rollos Jumbo
/**
 * @openapi
 * /inv/jumbos:
 *   post:
 *     summary: Crear registro en Rollos Jumbo
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/RolloJumbo'
 *     responses:
 *       201:
 *         description: Registro Editado en Inventario Insumos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: array 
 *                   example: "✅ Registro Exitoso en Rollos Jumbo!!"
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
 *                   example: "Error interno del servidor al crear registro de Rollo Jumbo"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 *     security:
 *       ddne_auth:
 *         write: registros
 */

//🔸 Inventario Produccion
/**
 * @openapi
 * /inv/produccion:
 *   post:
 *     summary: Crear registro en Inventario Producción
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/InventarioProduccion'
 *     responses:
 *       201:
 *         description: Registro Editado en Inventario Insumos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: array 
 *                   example: "✅ Registro Exitoso en Inventario Producción!!"
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
 *                   example: "Error interno del servidor al crear registro de Inv - Producción"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 *     security:
 *       ddne_auth:
 *         write: registros
 */

/*/////////////////
  Endpoints PATCH🌐
////////////////*/

//🔸 Inventario Insumos
/**
 * @openapi
 * /inv/insumos/{id Inv Insumos}:
 *   patch:
 *     summary: Editar registro en Inventario Insumos
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     parameters:
 *       - name: id Inv Insumos
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/InventarioInsumosPatch'
 *     responses:
 *       200:
 *         description: Registro Editado en Inventario Insumos
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
 *                   example: '✅ Registro Actualizado en Inventario Insumos!!'
 *                 info:
 *                   type: string 
 *                   example: 'Rows matched: 1  Changed: 1  Warnings: 0'
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
 *                   example: "Error al Editar registro de Inv - Insumos"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 *     security:
 *       ddne_auth:
 *         write: registros
 */

//🔸 Rollos Medianos
/**
 * @openapi
 * /inv/medianos/{id Rollo Mediano}:
 *   patch:
 *     summary: Editar registro en Rollos Medianos
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     parameters:
 *       - name: id Rollo Mediano
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/RolloMedianoPatch'
 *     responses:
 *       200:
 *         description: Registro Editado en Rollos Medianos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: array 
 *                   example: "✅ Registro Actualizado en Rollos Medianos!!"
 *                 info:
 *                   type: array 
 *                   example: "Rows matched: 1  Changed: 1  Warnings: 0"
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
 *                   example: "Error al Editar registro de Rollos Medianos"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 *     security:
 *       ddne_auth:
 *         write: registros
 */

//🔸 Rollos Jumbo
/**
 * @openapi
 * /inv/jumbos/{id Rollo Mediano}/{id Rollo Jumbo}:
 *   patch:
 *     summary: Editar registro en Rollos Jumbo
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     parameters:
 *       - name: id Rollo Mediano
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: id Rollo Jumbo
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/RolloJumboPatch'
 *     responses:
 *       200:
 *         description: Registro Editado en Rollos Jumbo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: array 
 *                   example: "✅ Registro Actualizado en Rollos Jumbo!!"
 *                 info:
 *                   type: array 
 *                   example: "Rows matched: 1  Changed: 1  Warnings: 0"
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
 *                   example: "Error al Editar registro de Rollos Jumbo"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 *     security:
 *       ddne_auth:
 *         write: registros
 */

//🔸 Inventario Produccion
/**
 * @openapi
 * /inv/produccion/{id Inv Produccion}:
 *   patch:
 *     summary: Editar registro en Inventario Producción
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     parameters:
 *       - name: id Inv Produccion
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/InventarioProduccionPatch'
 *     responses:
 *       200:
 *         description: Registro Editado en Inventario Producción
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: array 
 *                   example: "✅ Registro Actualizado en Inventario Producción!!"
 *                 info:
 *                   type: array 
 *                   example: "Rows matched: 1  Changed: 1  Warnings: 0"
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
 *                   example: "Error al Editar registro de Inv - Producción"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 *     security:
 *       ddne_auth:
 *         write: registros
 */


/*///////////////////
  Endpoints DELETE🌐
//////////////////*/

//🔸 Inventario Insumos
/**
 * @openapi
 * /inv/insumos-delete/{id Inv Insumos}:
 *   patch:
 *     summary: Inhabilitar un registro en Inventario Insumos
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     parameters:
 *       - name: id Inv Insumos
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Registro deshabilitado en Inventario Insumos
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
 *                   example: "✅ Registro 'Eliminado' en Inventario Insumos!!"
 *                 info:
 *                   type: string 
 *                   example: 'Rows matched: 1  Changed: 1  Warnings: 0'
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
 *                   example: "Error al Eliminar registro de Inv - Insumos"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 *     security:
 *       ddne_auth:
 *         write: registros
 */

//🔸 Rollos Medianos
/**
 * @openapi
 * /inv/medianos-delete/{id Rollo Mediano}:
 *   patch:
 *     summary: Inhabilitar un registro en Rollos Medianos
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     parameters:
 *       - name: id Rollo Mediano
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Registro deshabilitado en Rollos Medianos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: array 
 *                   example: "✅ Registro 'Eliminado' en Rollos Medianos!!"
 *                 info:
 *                   type: array 
 *                   example: "Rows matched: 1  Changed: 1  Warnings: 0"
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
 *                   example: "Error al Eliminar registro de Rollos Medianos"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 *     security:
 *       ddne_auth:
 *         write: registros
 */

//🔸 Rollos Jumbo
/**
 * @openapi
 * /inv/jumbos-delete/{id Rollo Mediano}/{id Rollo Jumbo}:
 *   patch:
 *     summary: Inhabilitar un registro en Rollos Jumbo
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     parameters:
 *       - name: id Rollo Mediano
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: id Rollo Jumbo
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Registro deshabilitado en Rollos Jumbo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: array 
 *                   example: "✅ Registro 'Eliminado' en Rollos Jumbo!!"
 *                 info:
 *                   type: array 
 *                   example: "Rows matched: 1  Changed: 1  Warnings: 0"
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
 *                   example: "Error al Eliminar registro de Rollos Jumbo"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 *     security:
 *       ddne_auth:
 *         write: registros
 */

//🔸 Inventario Produccion
/**
 * @openapi
 * /inv/produccion-delete/{id Inv Produccion}:
 *   patch:
 *     summary: Inhabilitar un registro en Inventario Producción
 *     tags:
 *       [Ⓜ️ Inventarios]
 *     parameters:
 *       - name: id Inv Produccion
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Registro deshabilitado en Inventario Producción
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: array 
 *                   example: "✅ Registro 'Eliminado' en Inventario Producción!!"
 *                 info:
 *                   type: array 
 *                   example: "Rows matched: 1  Changed: 1  Warnings: 0"
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
 *                   example: "Error al Eliminar registro de Inv - Producción"
 *                 error:
 *                   type: string
 *                   example: "El mensaje de Error correspodiente a la Solicitud"
 *     security:
 *       ddne_auth:
 *         write: registros
 */
