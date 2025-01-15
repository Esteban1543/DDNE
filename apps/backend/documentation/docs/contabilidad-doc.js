
//Contabilidad

/*/////////////////
  Endpoints GET🌐
////////////////*/

/**
 * @openapi
 * /transacciones-compras:
 *   get:
 *     summary: Obtener vista inicial de transacciones de compras
 *     tags:
 *       [Ⓜ️ Contabilidad]
 *     responses:
 *       '200':
 *         description: Vista inicial de transacciones de compras obtenida correctamente
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
 *                       example: 2
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
 *                   example: Error al obtener la vista inicial de transacciones de compras
 */

/**
 * @openapi
 * /transacciones-ventas:
 *   get:
 *     summary: Obtener vista inicial de transacciones de ventas
 *     tags:
 *       [Ⓜ️ Contabilidad]
 *     responses:
 *       '200':
 *         description: Vista inicial de transacciones de ventas obtenida correctamente
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
 *                       example: 2
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
 *                   example: Error al obtener la vista inicial de transacciones de ventas
 */

/**
 * @openapi
 * /productos:
 *   get:
 *     summary: Obtener vista inicial de productos
 *     tags:
 *       [Ⓜ️ Contabilidad]
 *     responses:
 *       '200':
 *         description: Vista inicial de productos obtenida correctamente
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
 *                   example: Error al obtener la vista inicial de productos
 */

/**
 * @openapi
 * /tipo_productos:
 *   get:
 *     summary: Obtener vista inicial de tipos de producto
 *     tags:
 *       [Ⓜ️ Contabilidad]
 *     responses:
 *       '200':
 *         description: Vista inicial de tipos de producto obtenida correctamente
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
 *                   example: Error al obtener la vista inicial de tipos de producto
 */

/**
 * @openapi
 * /tipo_insumo:
 *   get:
 *     summary: Obtener vista inicial de tipos de insumo
 *     tags:
 *       [Ⓜ️ Contabilidad]
 *     responses:
 *       '200':
 *         description: Vista inicial de tipos de insumo obtenida correctamente
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
 *                   example: Error al obtener la vista inicial de tipos de insumo
 */

/*/////////////////
  Endpoints POST🌐
////////////////*/

/**
 * @openapi
 * /infInventory:
 *   post:
 *     summary: Generar informe de inventario
 *     tags:
 *       [Ⓜ️ Contabilidad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               desde:
 *                 type: string
 *                 format: date
 *               hasta:
 *                 type: string
 *                 format: date
 *               tipo_informe:
 *                 type: integer
 *                 description: 1 para informe de insumos, 2 para informe de productos
 *     responses:
 *       '200':
 *         description: Informe generado correctamente
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
 *                     total_datos:
 *                       type: integer
 *                       example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/InformeInventario'
 *                 message:
 *                   type: string
 *                   example: Informe generado correctamente
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
 *                   example: Error al generar informe
 */

/**
 * @openapi
 * /registro-transaccion:
 *   post:
 *     summary: Crear una nueva transacción
 *     tags:
 *       [Ⓜ️ Contabilidad]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               tipoTransaccion:
 *                 type: string
 *                 description: 'Tipo de transacción (Venta o Compra)'
 *               tipo_factura:
 *                 type: string
 *                 description: Tipo de factura
 *               tipo_insumo:
 *                 type: string
 *                 description: Tipo de insumo
 *               precio:
 *                 type: number
 *                 description: Precio de la transacción
 *               tipo_persona:
 *                 type: string
 *                 description: 'Información de la persona en formato "fk_doc fk_tipo_doc"'
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo adjunto (comprobante)
 *     responses:
 *       '200':
 *         description: Transacción creada exitosamente
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
 *                   example: ✅ Registro Exitoso en Transacciones Ventas!!
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
 *                   example: Error al procesar la transacción
 */


/*/////////////////
  Endpoints PATCH🌐
////////////////*/

/**
 * @openapi
 * /update-Product/{id}:
 *   put:
 *     summary: Editar un producto por su ID
 *     tags:
 *       [Ⓜ️ Contabilidad]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del producto a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comentario:
 *                 type: string
 *                 description: Comentario asociado al producto
 *     responses:
 *       '200':
 *         description: Producto actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Se actualizó el comentario
 *                 id:
 *                   type: integer
 *                   example: 123
 *       '500':
 *         description: Error en la actualización
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error en la actualización
 */


/**
 * @openapi
 * /update_Transacciones:
 *   put:
 *     summary: Actualizar una transacción existente
 *     tags:
 *       [Ⓜ️ Contabilidad]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               persona:
 *                 type: string
 *                 description: Información de la persona en formato "fk_persona fk_t_identi"
 *               tp_transaccion:
 *                 type: string
 *                 description: Tipo de transacción (Venta o Compra)
 *               doc_transaccion:
 *                 type: string
 *                 description: Documento de la transacción
 *               articulo:
 *                 type: string
 *                 description: Identificador del artículo
 *               precio:
 *                 type: number
 *                 description: Precio de la transacción
 *               id:
 *                 type: integer
 *                 description: ID de la transacción a actualizar
 *     responses:
 *       '200':
 *         description: Transacción actualizada correctamente
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
 *                   example: ✅ Registro Exitoso en Transacciones Ventas!!
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
 *                   example: Error al procesar la transacción
 */


/*///////////////////
  Endpoints DELETE🌐
//////////////////*/
