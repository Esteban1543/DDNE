import { z } from 'zod';

//🔸 Validación Formulario de Nuevo registro en Inventario Insumos
export const form_inv_insumos = z.object({

  fk_n_transaccion: z.string().min(1).refine(v => v !== 'null', { message: 'Debe seleccionar una Transacción' }),
  
  // varchar(20)
  consecutivo: z.string().min(3).max(20),

  // varchar(20)
  tipo_insumo: z.enum(['Parafina', 'Papel', 'Rollo Carton']).nullable(false),
  // tipo_insumo: z.string().min(1).max(20).refine(v => v !== 'null', { message: 'Debe seleccionar un tipo de insumo' }),

  // decimal(6,2)
  peso: z.number().min(0).max(9999.99),

  // varchar(12) - valores permitidos
  estado: z.enum(['En Espera', 'Recibido', 'Cancelado']).nullable(false),

  // int
  unidades: z.number().int().min(1).positive(),

  // date - formato YYYY-MM-DD
  fecha_planificada: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

  // varchar(15)
  proveedor: z.string().min(1).max(15).refine(v => v !== 'null', { message: 'Debe seleccionar un Proveedor' }),

  // int 
  idUser: z.number().int().min(1).positive(),
});


//🔸 Validación Formulario de Nuevo registro en Rollos Medianos
export const form_rollos_medianos = z.object({

  // fk_insumo int NOT NULL,
  consecutivo_insumo: z.number().int().positive().min(3),

  // fk_color_1 varchar(12) NOT NULL,
  color1: z.string().min(1).max(12).refine( v => v !== 'null', {message: 'Seleccione un Color'}),

  // fk_color_2 varchar(12) NOT NULL,
  color2: z.string().min(1).max(12).refine( v => v !== 'null', {message: 'Seleccione un Color'}),

  // peso decimal(6, 2) NOT NULL,
  peso_inicial: z.number().positive().min(1).max(9999.99),

  // fk_usuario int NOT NULL,
  idUser: z.number().int().min(1).positive(),
})


//🔸 Validación Formulario de Nuevo registro en Rollos Jumbo
export const form_rollos_jumbo = z.object({

  // pfk_rollo_mediano int NOT NULL,
  id_rolloMdno: z.number().int().positive().min(1),

  // rollo_jumbo varchar(2) NOT NULL,
  id_rolloJumbo: z.number().int().positive().min(1), //este dato es varchar en DB

  // peso_jumbo decimal(6,2) NOT NULL,
  peso_jumbo: z.number().positive().min(1).max(9999.99),

  // fk_color varchar(12) NOT NULL,
  color: z.string().min(1).max(12).refine( v => v !== 'null', {message: 'Seleccione un Color'}),

  // fk_usuario int NOT NULL,
  idUser: z.number().int().min(1).positive(),
})


//🔸 Validación Formulario de Nuevo registro en Inventario Producción
export const form_inv_produccion = z.object({

  // fk_rollo_mediano int NOT NULL,
  id_rolloMdno: z.number().int().positive().min(1),

  // fk_rollo_jumbo varchar(2) NOT NULL,
  // id_rolloJumbo: z.number().int().min(0), //validacion pendiente por uso 
  id_rolloJumbo: z.string().min(1),

  // fk_producto int NOT NULL,
  producto_final: z.number().int().positive().min(1),

  // peso_producto varchar(5),
  peso_producto: z.number().min(0).max(9999.99),

  // fk_usuario int NOT NULL,
  idUser: z.number().int().min(1).positive(),
})