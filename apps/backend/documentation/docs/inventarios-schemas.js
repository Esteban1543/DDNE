// Schemas Ⓜ️

//🔸 Schema InventarioInsumos
/**
 * @openapi
 * components:
 *   schemas:
 *    InventarioInsumos:
 *      type: object
 *      properties:
 *        id_inventario_insumos:
 *          type: integer
 *        fk_tipo_insumo:
 *          type: string
 *        consecutivo_insumo:
 *          type: string
 *        peso_insumo:
 *          type: string
 *        unidades:
 *          type: integer
 *        fk_estado:
 *          type: string
 *        fecha_planificada:
 *          type: string
 *          format: date
 *        fecha_recepcion:
 *          type: string
 *          format: date
 *        fecha_registro:
 *          type: string
 *          format: date
 *        fk_proveedor:
 *          type: string
 *        fk_ti_proveedor:
 *          type: string
 *        fk_usuario:
 *          type: integer
 *        estado_registro:
 *          type: integer
 *        alias:
 *          type: string
 *        nombre_empresa:
 *          type: string
 *      example:
 *        fk_tipo_insumo: Papel
 *        consecutivo_insumo: PP03215S123541
 *        peso_insumo: 220
 *        unidades: 1
 *        fk_estado: En Espera
 *        fecha_planificada: 2023-04-12
 *        fecha_recepcion: null
 *        fecha_registro: 2023-04-6
 *        fk_proveedor: 1032458967
 *        fk_ti_proveedor: CC
 *        fk_usuario: 2
 *        estado_registro: true
 *    InventarioInsumosPatch:
 *      type: object
 *      properties:
 *        fk_estado:
 *          type: string
 *        fecha_recepcion:
 *          type: string
 *          format: date
 *      example:
 *        fk_estado: Recibido
 *        fecha_planificada: 2023-04-12
 */

//🔸 Schema RolloMediano
/**
 * @openapi
 * components:
 *   schemas:
 *    RolloMediano:
 *      type: object
 *      properties:
 *        fecha_registro:
 *          type: string
 *          format: date
 *        consecutivo_insumo:
 *          type: integer
 *        color1:
 *          type: string
 *          maxLength: 12
 *        color2:
 *          type: string
 *          maxLength: 12
 *        peso_inicial:
 *          type: number
 *          format: float
 *          minimum: 0
 *          maximum: 9999.99
 *        idUser:
 *          type: integer
 *        estado_registro:
 *          type: integer
 *          minimum: 0
 *          maximum: 255
 *      required:
 *        - fecha_registro
 *        - consecutivo_insumo
 *        - color1
 *        - color2
 *        - peso_inicial
 *        - idUser
 *        - estado_registro
 *      example:
 *        fecha_registro: "2024-02-29"
 *        consecutivo_insumo: 100
 *        color1: "Rojo"
 *        color2: "Rojo"
 *        peso_inicial: 116
 *        idUser: 2
 *        estado_registro: 1
 *    RolloMedianoPatch:
 *      type: object
 *      properties:
 *        fk_color_1:
 *          type: string
 *          maxLength: 12
 *        fk_color_2:
 *          type: string
 *          maxLength: 12
 *        peso:
 *          type: number
 *          format: float
 *          minimum: 0
 *          maximum: 9999.99
 *      required:
 *        - fk_color_1
 *        - fk_color_2
 *        - peso
 *      example:
 *        fk_color_1: "Rojo"
 *        fk_color_2: "Rojo"
 *        peso: 116
 */

//🔸 Schema RolloJumbo
 /**
 * @openapi
 * components:
 *   schemas:
 *    RolloJumbo:
 *      type: object
 *      properties:
 *        fecha_registro:
 *          type: string
 *          format: date
 *        id_rolloMdno:
 *          type: integer
 *        id_rolloJumbo:
 *          type: integer
 *        peso_jumbo:
 *          type: number
 *          format: float
 *          minimum: 0
 *          maximum: 9999.99
 *        color:
 *          type: string
 *          maxLength: 12
 *        idUser:
 *          type: integer
 *        estado_registro:
 *          type: integer
 *          minimum: 0
 *          maximum: 255
 *      required:
 *        - fecha_registro
 *        - id_rolloMdno
 *        - id_rolloJumbo
 *        - peso_jumbo
 *        - color
 *        - idUser
 *        - estado_registro
 *      example:
 *        fecha_registro: "2024-02-28"
 *        id_rolloMdno: 1
 *        id_rolloJumbo: 1
 *        peso_jumbo: 17.45
 *        color: "Rojo"
 *        idUser: 2
 *        estado_registro: 1
 *    RolloJumboPatch:
 *      type: object
 *      properties:
 *        peso_jumbo:
 *          type: number
 *          format: float
 *          minimum: 0
 *          maximum: 9999.99
 *        fk_color:
 *          type: string
 *          maxLength: 12
 *      required:
 *        - peso_jumbo
 *        - fk_color
 *      example:
 *        peso_jumbo: 17.45
 *        fk_color: "Rojo"
 */

 //🔸 Schema InventarioProduccion
/**
 * @openapi
 * components:
 *   schemas:
 *    InventarioProduccion:
 *      type: object
 *      properties:
 *        fecha_registro:
 *          type: string
 *          format: date
 *        id_rolloMdno:
 *          type: integer
 *        id_rolloJumbo:
 *          type: integer
 *        producto_final:
 *          type: integer
 *        peso_producto:
 *          type: number
 *          format: float
 *          minimum: 0
 *          maximum: 9999.99
 *        idUser:
 *          type: integer
 *        estado_registro:
 *          type: integer
 *          minimum: 0
 *          maximum: 255
 *      required:
 *        - fecha_registro
 *        - id_rolloMdno
 *        - id_rolloJumbo
 *        - producto_final
 *        - peso_producto
 *        - idUser
 *        - estado_registro
 *      example:
 *        fecha_registro: "2024-02-28"
 *        id_rolloMdno: 1
 *        id_rolloJumbo: 1
 *        producto_final: 8
 *        peso_producto: 0
 *        idUser: 2
 *        estado_registro: 1
 *    InventarioProduccionPatch:
 *      type: object
 *      properties:
 *        producto_final:
 *          type: integer
 *        peso_producto:
 *          type: number
 *          format: float
 *          minimum: 0
 *          maximum: 9999.99
 *      required:
 *        - producto_final
 *        - peso_producto
 *      example:
 *        producto_final: 8
 *        peso_producto: 12
 */
