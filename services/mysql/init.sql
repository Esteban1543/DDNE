CREATE DATABASE IF NOT EXISTS database_ddne;
USE database_ddne;

-- LAS TABLAS SE ENCUENTRAN EN EL ORDEN NECESARIO PARA SU CORRECTA CREACIÓN

CREATE TABLE tipo_identificacion(
	tipo_id varchar(4) NOT NULL,
	PRIMARY KEY (tipo_id)
);

CREATE TABLE tipo_persona(
    tipo_persona VARCHAR(11) NOT NULL, -- proveedor
    PRIMARY KEY(tipo_persona)
);

CREATE TABLE datos_persona(
    -- id_dpersona int NOT NULL AUTO_INCREMENT,
    persona_id VARCHAR(15) NOT NULL,
    fk_tipo_identificacion varchar(4) NOT NULL,
    nombre_1 varchar(25) NOT NULL,
    nombre_2 varchar(25),
    apellido_1 varchar(25) NOT NULL,
    apellido_2 varchar(25),
    telefono varchar(15) NOT NULL,
    direccion varchar(65) NOT NULL, -- transversal 112B norte # 202A - 90 int 20 apto 1104 (51)
    correo varchar(70) NOT NULL, -- diego_sebastian_ladino_hernandez@correo.udistrital.edu.co (57)
    fk_tipo_persona varchar(11) NOT NULL,
    fecha_registro datetime NOT NULL,
    PRIMARY KEY(persona_id, fk_tipo_identificacion), -- Esta tabla tiene una llave primaria compuesta
    FOREIGN KEY (fk_tipo_identificacion) REFERENCES tipo_identificacion(tipo_id) ON UPDATE CASCADE,
    FOREIGN KEY (fk_tipo_persona) REFERENCES tipo_persona(tipo_persona) ON UPDATE CASCADE
);

CREATE TABLE empresas(
    nit varchar(20) NOT NULL, -- 20 digitos dependiendo de la generacion de la cedula
    nombre_empresa varchar(90) NOT NULL,
    descripcion_empresa varchar(70), -- comercializadora de papel parafinado y de cocina (48)
    primary key (nit)
);

CREATE TABLE proveedores(
    -- id_proveedor int NOT NULL AUTO_INCREMENT,
    fk_id_proveedor varchar(15) NOT NULL,
    fk_ti_proveedor varchar(4) NOT NULL,
    fk_empresa varchar(20) NOT NULL,
    estado_proveedor TINYINT NOT NULL,
    PRIMARY KEY (fk_ti_proveedor, fk_id_proveedor),
    FOREIGN KEY (fk_id_proveedor, fk_ti_proveedor) REFERENCES datos_persona(persona_id, fk_tipo_identificacion) ON UPDATE CASCADE,
    FOREIGN KEY (fk_empresa) REFERENCES empresas(nit) ON UPDATE CASCADE
);

CREATE TABLE clientes(
    -- id_c int NOT NULL AUTO_INCREMENT,
    fk_id_cliente varchar(15) NOT NULL,
    fk_ti_cliente varchar(4) NOT NULL,
    fk_empresa varchar(20) NOT NULL,
    estado_cliente TINYINT NOT NULL,
    PRIMARY KEY (fk_ti_cliente, fk_id_cliente),
    FOREIGN KEY (fk_id_cliente, fk_ti_cliente) REFERENCES datos_persona(persona_id, fk_tipo_identificacion) ON UPDATE CASCADE,
    FOREIGN KEY (fk_empresa) REFERENCES empresas(nit) ON UPDATE CASCADE
);

CREATE TABLE usuarios(
    id_usuario int NOT NULL AUTO_INCREMENT,
    alias varchar(25) NOT NULL, -- jefe de operaciones (19)
    contrasena TEXT NOT NULL,
    fk_id_empleado varchar(15) NOT NULL,
    fk_ti_empleado varchar(4) NOT NULL,
    estado_usuario TINYINT NOT NULL,
    PRIMARY KEY (id_usuario),
    FOREIGN KEY ( fk_id_empleado, fk_ti_empleado) REFERENCES datos_persona(persona_id, fk_tipo_identificacion) ON UPDATE CASCADE
);

CREATE TABLE permisos(
    id_permiso int NOT NULL AUTO_INCREMENT,
    permiso_sistema varchar(45) NOT NULL,
    PRIMARY KEY (id_permiso)
);

CREATE TABLE usuario_permiso(
    id_usuario_permiso int NOT NULL AUTO_INCREMENT,
    fk_usuario int NOT NULL,
    fk_permiso int NOT NULL,
    PRIMARY KEY (id_usuario_permiso),
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (fk_permiso) REFERENCES permisos(id_permiso) ON UPDATE CASCADE
);

-- TABLAS PARA TRANSACCIONES
CREATE TABLE tipo_documento(
    doc_transaccion varchar(15) NOT NULL UNIQUE, -- Remisión(8)
    PRIMARY KEY (doc_transaccion)   
); 

CREATE TABLE tipo_transaccion(
    tp_transaccion varchar(10) NOT NULL UNIQUE, -- venta (5)
    PRIMARY KEY (tp_transaccion)
);

-- TABLAS PARA INVENTARIOS
CREATE TABLE estado(
    tipo_estado varchar(12) NOT NULL, -- En Espera(9)
    PRIMARY KEY (tipo_estado)
);

CREATE TABLE tipo_insumo(
    nombre_insumo varchar(20) NOT NULL, -- Rollo Carton
    PRIMARY KEY (nombre_insumo)
);

-- TABLAS PARA PRODUCTOS
CREATE TABLE tipo_producto(
    producto varchar(17) NOT NULL, -- Rollo Jumbo(11)
    descripcion varchar(250),
    imagen varchar(100) NOT NULL,
    PRIMARY KEY(producto)
);

CREATE TABLE precios_productos(
    id_precios varchar(10) NOT NULL,
    descripcion varchar(20) NOT NULL,
    unidad_medida varchar(3) NOT NULL,
    peso_kg int,	
    medida varchar(10),
    cantidad int,
    precio decimal(6,3) NOT NULL,
    PRIMARY KEY (id_precios)
);

CREATE TABLE productos(
    id_producto int NOT NULL AUTO_INCREMENT,
    fk_tipo_producto varchar(17) NOT NULL,
    fk_precio varchar(10) NOT NULL, 
    comentario varchar(45), -- para posibles medidas o especificaciones
    PRIMARY KEY (id_producto),
    FOREIGN KEY (fk_tipo_producto) REFERENCES tipo_producto(producto) ON UPDATE CASCADE,
    FOREIGN KEY (fk_precio) REFERENCES precios_productos(id_precios) ON UPDATE CASCADE
);

-- --
CREATE TABLE transacciones_compras(
    id_transacciones int NOT NULL AUTO_INCREMENT,
    fk_tipo_transaccion varchar(10) NOT NULL,
    fk_tipo_documento  varchar(15) NOT NULL,
    fk_articulo varchar(20) NOT NULL,
    fk_t_identi varchar(4) NOT NULL, 
    fk_proveedor varchar(15) NOT NULL, -- Proveedor(9)
    fecha_registro date NOT NULL,
    precio varchar(15) NOT NULL,
    comprobante varchar(150) NOT NULL, -- Enlace de la ruta donde guarde
    PRIMARY KEY (id_transacciones),
    FOREIGN KEY (fk_tipo_transaccion) REFERENCES tipo_transaccion(tp_transaccion) ON UPDATE CASCADE,
    FOREIGN KEY (fk_tipo_documento) REFERENCES tipo_documento(doc_transaccion) ON UPDATE CASCADE,
    FOREIGN KEY (fk_articulo) REFERENCES tipo_insumo(nombre_insumo) ON UPDATE CASCADE,
    FOREIGN KEY (fk_t_identi, fk_proveedor) REFERENCES proveedores (fk_ti_proveedor, fk_id_proveedor) ON UPDATE CASCADE
);

CREATE TABLE transacciones_ventas(
    id_transacciones int NOT NULL AUTO_INCREMENT,
    fk_tipo_transaccion varchar(10) NOT NULL,
    fk_tipo_documento  varchar(15) NOT NULL,
    fk_articulo varchar(17) NOT NULL,
    fk_t_identi varchar(4) NOT NULL, 
    fk_cliente varchar(15) NOT NULL, -- Cliente (9)
    fecha_registro date NOT NULL,
    precio varchar(15) NOT NULL,
    comprobante varchar(150) NOT NULL, -- Enlace de la ruta donde guarde
    PRIMARY KEY (id_transacciones),
    FOREIGN KEY (fk_tipo_transaccion) REFERENCES tipo_transaccion(tp_transaccion) ON UPDATE CASCADE,
    FOREIGN KEY (fk_tipo_documento) REFERENCES tipo_documento(doc_transaccion) ON UPDATE CASCADE,
    FOREIGN KEY (fk_articulo) REFERENCES tipo_producto(producto) ON UPDATE CASCADE,
    FOREIGN KEY (fk_t_identi, fk_cliente) REFERENCES clientes(fk_ti_cliente, fk_id_cliente) ON UPDATE CASCADE
);

CREATE TABLE inventario_insumos(
    id_inventario_insumos int NOT NULL AUTO_INCREMENT,
    fk_n_transaccion  int NOT NULL,
    fk_tipo_insumo varchar(20) NOT NULL,
    consecutivo_insumo varchar(20) NOT NULL,-- PP3A0231046140(14)
    peso_insumo decimal(6,2), -- En Papel el peso que se ingresa es el del Rollo Grande, no el de cada rollo impreso y el peso de c/u se asigna en inventario producción
    unidades int NOT NULL,
    fk_estado  varchar(12) NOT NULL,
    fecha_planificada date NOT NULL,
    fecha_recepcion date,
    fecha_registro date NOT NULL,
    fk_proveedor varchar(15) NOT NULL, 
    fk_ti_proveedor varchar(4) NOT NULL,
    fk_usuario int NOT NULL,
    estado_registro TINYINT NOT NULL,
    PRIMARY KEY (id_inventario_insumos),
    FOREIGN KEY (fk_tipo_insumo) REFERENCES tipo_insumo(nombre_insumo) ON UPDATE CASCADE,
    FOREIGN KEY (fk_estado) REFERENCES estado(tipo_estado) ON UPDATE CASCADE,
    FOREIGN KEY (fk_ti_proveedor, fk_proveedor) REFERENCES proveedores(fk_ti_proveedor, fk_id_proveedor) ON UPDATE CASCADE,
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario), -- Este Campo no se puede actualizar debido a que los usuarios no se eliminarán sino que solo se inhabilitarán.
    FOREIGN KEY (fk_n_transaccion) REFERENCES transacciones_compras(id_transacciones)
)AUTO_INCREMENT = 100;


-- TABLAS PARA INV-PRODUCCIÓN --
CREATE TABLE colores(
    color varchar(12) NOT NULL, -- amarillo(8)
    PRIMARY KEY (color)
);

CREATE TABLE rollos_medianos(
    id_rollos_medianos int NOT NULL AUTO_INCREMENT,
    fecha_registro date NOT NULL,   
    fk_insumo int NOT NULL,
    fk_color_1 varchar(12) NOT NULL,
    fk_color_2 varchar(12) NOT NULL,
    peso decimal(6,2) NOT NULL,
    fk_usuario int NOT NULL,
    estado_registro TINYINT NOT NULL,

    PRIMARY KEY (id_rollos_medianos),
    FOREIGN KEY (fk_insumo) REFERENCES inventario_insumos(id_inventario_insumos),
    FOREIGN KEY (fk_color_1) REFERENCES colores(color) ON UPDATE CASCADE,
    FOREIGN KEY (fk_color_2) REFERENCES colores(color) ON UPDATE CASCADE
);

CREATE TABLE cortes_jumbo(
    fecha_registro date NOT NULL,
    pfk_rollo_mediano int NOT NULL,
    rollo_jumbo int NOT NULL,
    peso_jumbo decimal(6,2) NOT NULL,
    fk_color varchar(12) NOT NULL,
    fk_usuario int NOT NULL,
    estado_registro TINYINT NOT NULL,

    FOREIGN KEY (pfk_rollo_mediano) REFERENCES rollos_medianos(id_rollos_medianos),
    FOREIGN KEY (fk_color) REFERENCES colores(color) ON UPDATE CASCADE,
    PRIMARY KEY (pfk_rollo_mediano, rollo_jumbo)
);

CREATE TABLE inventario_produccion(
    id_inv_produccion INT NOT NULL AUTO_INCREMENT,
    fecha_registro date NOT NULL,
    fk_rollo_mediano int NOT NULL,
    fk_rollo_jumbo int NOT NULL, -- Se podría generar un unico espacio al concatenar ambos IDs
    fk_color varchar(12) NOT NULL,
    fk_producto int NOT NULL,
    peso_producto decimal(6,2) NOT NULL,
    fk_usuario int NOT NULL,
    estado_registro TINYINT NOT NULL,

    PRIMARY KEY (id_inv_produccion),
    FOREIGN KEY (fk_rollo_mediano, fk_rollo_jumbo) REFERENCES cortes_jumbo(pfk_rollo_mediano, rollo_jumbo),
    FOREIGN KEY (fk_producto) REFERENCES productos(id_producto),
    FOREIGN KEY (fk_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (fk_color) REFERENCES colores(color) ON UPDATE CASCADE
)AUTO_INCREMENT = 100;

-- ----------------------------------------------------------------------------------------------------------------->|
-- DATOS DE PRUEBA - DATA BASE DDNE INVENTORY  ------------------------------------------------------->|

-- Tipo de Identificación 
INSERT INTO tipo_identificacion(tipo_id)
VALUES  
  ("CC"), 
	("CE"), 
  ("Otro")
; 

-- Tipo Persona 
INSERT INTO tipo_persona(tipo_persona) 
VALUES 
	("Empleado"), 
	("Proveedor"), 
  ("Cliente")
; 

-- Datos Persona 
INSERT INTO datos_persona(persona_id, fk_tipo_identificacion, nombre_1, nombre_2, apellido_1, apellido_2, telefono, direccion, correo, fk_tipo_persona, fecha_registro) 
VALUES 
-- Empleados
	("20654865", "CC", "Jorge", "Sebastian", "Mosquera", "Ballen", "3128549685", "Cll 82 # 20a - 12", "jsmosquera@gmail.com", "Empleado", "2023-02-12"), -- 1
	("1007393654", "CC", "Nelson", "Javier", "Varela", "Hortua", "3114568532", "Cr 68 # 17 - 23", "njvarela@gmail.com", "Empleado", "2023-02-15"), -- 2
	("48456325", "CC", "Cristian", null, "Moreno", "García", "3008573695", "Cll 12 # 64 - 09", "cristianmg@gmail.com", "Empleado", "2023-02-21"), -- 3
-- Proveedores
	("52965785", "CE", "Vikram", null, "Watson", null, "6482085", "Cll 120 # 7b - 6", "vikram12@gmail.com", "Proveedor", "2023-02-12"), -- 4
	("1032458967", "CC", "Camila", null, "Delgado", "Perez", "3224568512", "Cll 6d # 72a - 85", "camidp@outlook.com", "Proveedor", "2023-02-15"), -- 5
	("45965784", "CC", "Juan", "Camilo", "Anzola", "Estrada", "3054218576", "Cr 92b # 11a - 20", "janzola@gmail.com", "Proveedor", "2023-02-22"), -- 6
-- Clientes	
	("103045685", "CC", "Jaime", "Miguel", "Orjuela", "Puente", "3226548567", "Cll 102 # 19 - 11", "jmiguelo@hotmail.com", "Cliente", "2023-02-12"), -- 7
  ("204596855", "CC", "Julio", null, "Munevar", "Ortiz", "3012228547", "Av 19 # 109 - 02", "jmunevaro@outlook.com", "Cliente", "2023-02-16"), -- 8
  ("635847596", "CE", "Claudio", "Manuel", "Cierafi", "Parrado", "314856932", "Cr 112 # 22sur - 17", "cmanuelc@gmail.com", "Cliente", "2023-02-19") -- 9
;


-- Empresas
INSERT INTO empresas(nit, nombre_empresa, descripcion_empresa) 
VALUES 
	("Default", "Default", "No registra"), 
	-- E. Proveedores
	("80234698-4", "Solla S.A.S", "Proveedor de Parafina"), 
	("10122012334-5", "Carvajal S.A.S", "Proveedor de Papel"), 
  ("8088754621-3", "Propandina S.A.S", "Proveedor de Papel"), 
	-- E. Clientes
	("80234688-4", "Bogga Waffles", "Empresa Cliente"), 
  ("2684596-2", "Restaurante El Ajillo", "Empresa Cliente"), 
  ("90995264-5", "La Salchipaperia", "Empresa Cliente")
; 

-- Proveedores
INSERT INTO proveedores(fk_id_proveedor, fk_ti_proveedor, fk_empresa, estado_proveedor)  
VALUES
	("52965785", "CE", "80234698-4", 1),
	("1032458967", "CC", "10122012334-5", 1),
	("45965784", "CC", "8088754621-3", 1)
;

-- Clientes
INSERT INTO clientes(fk_id_cliente, fk_ti_cliente, fk_empresa, estado_cliente)
VALUES
	("103045685", "CC", "80234688-4", 1),
  ("204596855", "CC", "2684596-2", 1),
  ("635847596", "CE", "90995264-5", 1)
;

-- Usuarios
INSERT INTO usuarios( alias, contrasena, fk_id_empleado, fk_ti_empleado, estado_usuario) 
VALUES 
	( "Admin", "$2b$10$ZwREz01eXuHnIBXgCM7EN.gCbMl7/zn3WzbgBlLa82jWS5konu1lC" , "1007393654", "CC", 1),
  ( "J.operaciones", "$2b$10$zuds5C3j1sQwrchn/87//uegT6Ng6SrVUd6Sow3FaAkhQ4tC0Lliy" , "48456325", "CC", 1),
  ( "Contabilidad", "$2b$10$ytcjGmnJtE5k3EjzbBAd7eZaJopLTmMwdu5az3VINZuRXB4H8Gdpq" , "20654865", "CC", 1)
;

-- Permisos
INSERT INTO permisos( permiso_sistema)
VALUES 
	("Insumos"),
	("Produccion"),
	("Transacciones"),
  ("Informes"),
  ("Productos"),
  ("Proveedores"),
	("Clientes"),
	("Usuarios")
;

-- Usuario-Permiso
INSERT INTO usuario_permiso(fk_usuario, fk_permiso)
VALUES 
-- Admin
	("1", "1"), 
	("1", "2"),
  ("1", "3"),
	("1", "4"),
	("1", "5"),
	("1", "6"),
  ("1", "7"),
  ("1", "8"),
-- Jefe de Operaciones
	("2", "1"),
  ("2", "3"),
  ("2", "5"),
-- Contabilidad
  ("3", "2"),
  ("3", "4"),
  ("3", "6"),
  ("3", "7")
;

-- T. Documento
INSERT INTO tipo_documento(doc_transaccion) 
VALUES 
	("Factura"),
	("Remisión")
;

-- T. Transaccion
INSERT INTO tipo_transaccion(tp_transaccion) 
VALUES 
	("Compra"),
	("Venta")
;

-- Estado
INSERT INTO estado( tipo_estado) 
VALUES 
	("En Espera"), 
	("Recibido"), 
	("Cancelado")
; 

-- Tipo Insumo
INSERT INTO tipo_insumo( nombre_insumo) 
VALUES 
	("Parafina"),
	("Papel"),
	("Rollo Carton")
;

-- T. Producto
INSERT INTO tipo_producto(producto, imagen) 
VALUES 
	("Jumbo", "../assets/img/rollo.png"),
	("Rollito", "../assets/img/rollito.png"),
	("Resma", "../assets/img/resmas.png"),
	("Vinipel", "../assets/img/vinipel.png")
;

-- Precios
INSERT INTO precios_productos(id_precios, descripcion, unidad_medida, peso_kg,	medida, cantidad, precio) 
VALUES
  -- Resmas 📌

	-- medida cantidad (N° hojas)
	("30x30x100", "resma por hojas", "hjs",	null, "30x30", 100, "30.000"),
	("30x40x80", "resma por hojas", "hjs",	null,	"30x40", 80, "35.000"),
	("30x40x100", "resma por hojas", "hjs",	null, "30x40", 100, "40.000"),

	-- medida peso(kg)
	("30x30_kg", "resma por kg", "kg",	1, "30x30", null, "28.000"),
	("30x40_kg", "resma por kg", "kg",	1,	"30x40", null, "31.000"),
	
	-- Rollos 📌
	-- peso por kg
	("roll_kg", "rollo por kg", "kg",	"1",	null,	null,	"15.490"),

	-- medidas por mts
	("roll_20",	"rollo por metro", "mts", null,	"20",	null, "14.000"),
	("roll_50",	"rollo por metro", "mts", null,	"50",	null, "17.000"),
	("roll_100", "rollo por metro", "mts", 	null,	"100",	null, "26.000"),
	("roll_200", "rollo por metro", "mts", 	null,	"200",	null, "52.000"),
	("roll_300", "rollo por metro", "mts", 	null,	"300",	null, "75.000")
;

INSERT INTO productos(fk_tipo_producto, fk_precio, comentario) 
VALUES 
	-- Rollos Jumbo
	("Jumbo", "roll_kg", null), -- 1
	("Jumbo", "roll_300", null), -- 2
	-- Rollitos
	("Rollito", "roll_20", null), -- 3
 	("Rollito", "roll_50", null), -- 4
 	("Rollito", "roll_100" , null), -- 5
	("Rollito", "roll_kg" , null), -- 6
	-- Resmas
	("Resma", "30x30x100" , null), -- 7
	("Resma", "30x40x80" , null), -- 8
	("Resma", "30x40x100", null), -- 9
	("Resma", "30x30_kg", null), -- 10
	("Resma", "30x40_kg", null), -- 11
	-- Vinipel
	("Vinipel", "roll_kg" , null), -- 12
	("Vinipel", "roll_20" , null) -- 13
;

-- Transacciones
    -- Compras
INSERT INTO transacciones_compras(fk_tipo_transaccion, fk_tipo_documento, fk_articulo, fk_proveedor, fk_t_identi, fecha_registro, precio, comprobante) 
VALUES 
	("Compra", "Remisión", "Papel", "45965784", "CC", "2024-01-01", "220.200", "1710749744088-Soporte.pdf"),
  ("Compra", "Factura", "Papel", "1032458967", "CC", "2023-01-31", "219.500", "1710749744087-Soporte.pdf"),
  ("Compra", "Factura", "Parafina", "52965785", "CE", "2023-01-12", "1200.200", "1710749744085-Soporte.pdf"),	
	("Compra", "Remisión", "Rollo Carton", "1032458967", "CC", "2023-02-01", "203.200", "1710749744043-Soporte.pdf"),
	("Compra", "Remisión", "Rollo Carton", "1032458967", "CC", "2023-01-01", "203.200", "CANCELADO!"),

  ("Compra", "Factura", "Rollo Carton", "1032458967", "CC", "2023-02-03", "213.200", "1710749744044-Soporte.pdf"),
	("Compra", "Remisión", "Parafina", "52965785", "CE", "2023-03-12", "623.200", "1710749744084-Soporte.pdf"),
  ("Compra", "Factura", "Papel", "45965784", "CC", "2023-03-16", "223.200", "1710749744089-Soporte.pdf"),
	("Compra", "Factura", "Parafina", "52965785", "CE", "2023-03-17", "1223.200", "1710749744084-Soporte.pdf"),
	("Compra", "Factura", "Papel", "45965784", "CC", "2023-04-12", "218.600", "1710749744089-Soporte.pdf"),
	("Compra", "Remisión", "Rollo Carton", "1032458967", "CC", "2023-06-01", "203.200", "1710749744044-Soporte.pdf")
;

	-- Ventas
INSERT INTO transacciones_ventas(fk_tipo_transaccion, fk_tipo_documento, fk_articulo, fk_cliente, fk_t_identi, fecha_registro, precio, comprobante) 
VALUES 
	("Venta", "Factura", "Jumbo", "103045685", "CC", CURDATE(), "164.000", "1710749744365-Soporte.pdf"),	
	("Venta", "Factura", "Resma", "635847596", "CE", CURDATE(), "70.000", "1710749744365-Soporte.pdf"),	
	("Venta", "Remisión", "Vinipel", "204596855", "CC", CURDATE(), "20.000", "1710749744965-Soporte.pdf"),
	("Venta", "Factura", "Resma", "103045685", "CC", CURDATE(), "70.000", "1710749744365-Soporte.pdf"),
	("Venta", "Factura", "Rollito", "204596855", "CC", CURDATE(), "60.000", "1710749744365-Soporte.pdf"),
	("Venta", "Remisión", "Jumbo", "103045685", "CC", CURDATE(), "164.000", "1710749744965-Soporte.pdf"),
	("Venta", "Remisión", "Rollito", "635847596", "CE", CURDATE(), "75.000", "1710749744965-Soporte.pdf"),
	("Venta", "Factura", "Resma", "103045685", "CC", CURDATE(), "70.000", "1710749744365-Soporte.pdf"),
	("Venta", "Remisión", "Vinipel", "204596855", "CC", CURDATE(), "20.000", "1710749744965-Soporte.pdf"),
	("Venta", "Factura", "Jumbo", "103045685", "CC", CURDATE(), "164.000", "1710749744365-Soporte.pdf"),
	("Venta", "Factura", "Resma", "635847596", "CE", CURDATE(), "70.000", "1710749744365-Soporte.pdf"),
	("Venta", "Remisión", "Rollito", "103045685", "CC", CURDATE(), "90.000", "1710749744965-Soporte.pdf"),
	("Venta", "Remisión", "Jumbo", "204596855", "CC", CURDATE(), "164.000", "1710749744965-Soporte.pdf"),
	("Venta", "Remisión", "Resma", "103045685", "CC", CURDATE(), "70.000", "1710749744965-Soporte.pdf")
;

-- I. Insumos
INSERT INTO inventario_insumos (fk_n_transaccion, fk_tipo_insumo, consecutivo_insumo, peso_insumo, unidades, fk_estado, fecha_planificada, fecha_recepcion, fecha_registro, fk_proveedor, fk_ti_proveedor, fk_usuario, estado_registro) 
VALUES 
	-- Papel
	( 1, "Papel", "PP3A0231046140", 220, "1", "Recibido", "2022-12-26", "2023-12-30", "2024-01-01", "1032458967", "CC", "2", 1),
	( 2,  "Papel", "PP3A0231049587", 215, "1", "Recibido","2024-02-07", "2023-02-06", "2023-01-31", "1032458967", "CC", "2", 1),
	-- Parafina
	( 3, "Parafina", "N/A", 25, "2", "Recibido","2023-01-21", "2023-01-20", "2023-01-12", "52965785", "CE","2", 1),
	-- Rollo Carton
	( 4, "Rollo Carton", "N/A", 40, "10", "Recibido", "2023-01-25", "2023-02-01", "2023-02-01","45965784","CC", "2", 1),
	( 5, "Rollo Carton", "N/A", 40, "30", "Cancelado", "2023-01-20", null, "2023-01-01","45965784","CC", "2", 1),
	
	-- Continuación Ejemplos
	( 6, "Rollo Carton", "N/A", 40, "10", "Recibido", "2023-02-23", "2023-02-01", "2023-02-03","45965784","CC", "2", 1),
	( 7, "Parafina", "N/A", 25, "1", "Recibido","2023-03-21", "2023-03-20", "2023-03-12", "52965785", "CE","2", 1),
	( 8, "Papel", "PP3A0231046354", 210, "1", "Recibido", "2023-03-20", "2023-03-23", "2023-03-16", "1032458967", "CC", "2", 1),
	( 9, "Parafina", "N/A", 25, "2", "Recibido","2023-03-21", "2023-03-20", "2023-03-17", "52965785", "CE","2", 1),
	( 10, "Papel", "PP3A0231049357", 211, "1", "Recibido","2024-04-17", "2023-04-16", "2023-04-12", "1032458967", "CC", "2", 1),
	( 11, "Rollo Carton", "N/A", 40, "10", "Recibido", "2023-06-25", "2023-07-01", "2023-06-01","45965784","CC", "2", 1)
;

-- Colores
INSERT INTO colores(color) 
VALUES 
	("Transparente"),
	("Blanco"),
	("Negro"),
	("Verde"),
	("Rojo"),
	("Azul"),
	("Amarillo"),
	("Naranja"),
	("Custom")
;

-- Alistamiento Rollos Medianos (Impresos)
INSERT INTO rollos_medianos (fecha_registro, fk_insumo, fk_color_1, fk_color_2, peso, fk_usuario, estado_registro)
VALUES
	("2023-01-02", 100, "Rojo", "Rojo", 116, "2", "1"),
	("2023-01-02", 100, "Rojo", "Custom", 110, "2", "1"),
	("2023-01-02", 100, "Custom", "Custom", 118, "2", "1"),
	("2023-02-08", 101, "Negro", "Negro", 112, "2", "1"),
	("2023-02-08", 101, "Blanco", "Rojo", 109, "2", "1"),
	("2023-02-08", 101, "Verde", "Blanco", 113, "2", "1")
;

-- Cortes Jumbo
INSERT INTO cortes_jumbo (fecha_registro, pfk_rollo_mediano, rollo_jumbo, peso_jumbo, fk_color, fk_usuario, estado_registro)
VALUES
	-- Rollo Mediano/Impreso 1
	("2023-01-03", 1, "1", 17.45, "Rojo", "2", "1"),
	("2023-01-03", 1, "2", 17.5, "Rojo", "2", "1"),
	("2023-01-03", 1, "3", 17.75, "Rojo", "2", "1"),
	("2023-01-03", 1, "4", 17.4, "Rojo", "2", "1"),
	("2023-01-03", 1, "5", 19.45, "Rojo", "2", "1"),
	("2023-01-03", 1, "6", 19.1, "Rojo", "2", "1"),
	("2023-01-03", 1, "7", 18.55, "Rojo", "2", "1"),
	("2023-01-03", 1, "8", 18, "Rojo", "2", "1"),

	-- Rollo Mediano/Impreso 2
	("2023-01-03", 2, "1", 17.45, "Rojo", "2", "1"),
	("2023-01-03", 2, "2", 17, "Custom", "2", "1"),
	("2023-01-03", 2, "3", 17.25, "Rojo", "2", "1"),
	("2023-01-03", 2, "4", 17.75, "Custom", "2", "1"),
	("2023-01-03", 2, "5", 18.3, "Rojo", "2", "1"),
	("2023-01-03", 2, "6", 16.42, "Custom", "2", "1"),
	("2023-01-03", 2, "7", 18.25, "Rojo", "2", "1"),
	("2023-01-03", 2, "8", 18, "Rojo", "2", "1"),

	-- Rollo Mediano/Impreso 3
	("2023-01-04", 3, "1", 17.8, "Custom", "2", "1"),
	("2023-01-04", 3, "2", 18.2, "Custom", "2", "1"),
	("2023-01-04", 3, "3", 17.6, "Custom", "2", "1"),
	("2023-01-04", 3, "4", 18.1, "Custom", "2", "1"),
	("2023-01-04", 3, "5", 17.9, "Custom", "2", "1"),
	("2023-01-04", 3, "6", 18.5, "Custom", "2", "1"),
	("2023-01-04", 3, "7", 17.3, "Custom", "2", "1"),
	("2023-01-04", 3, "8", 17.7, "Custom", "2", "1"),

	-- Rollo Mediano/Impreso 4
	("2023-02-08", 4, "1", 18.3, "Negro", "2", "1"),
	("2023-02-08", 4, "2", 18.8, "Negro", "2", "1"),
	("2023-02-08", 4, "3", 17.9, "Negro", "2", "1"),
	("2023-02-08", 4, "4", 18.5, "Negro", "2", "1"),
	("2023-02-08", 4, "5", 17.5, "Negro", "2", "1"),
	("2023-02-08", 4, "6", 18.2, "Negro", "2", "1"),
	("2023-02-08", 4, "7", 17.7, "Negro", "2", "1"),
	("2023-02-08", 4, "8", 18, "Negro", "2", "1"),

	-- Rollo Mediano/Impreso 5
	("2023-02-09", 5, "1", 17.2, "Blanco", "2", "1"),
	("2023-02-09", 5, "2", 17.6, "Rojo", "2", "1"),
	("2023-02-09", 5, "3", 17.9, "Blanco", "2", "1"),
	("2023-02-09", 5, "4", 17.3, "Rojo", "2", "1"),
	("2023-02-09", 5, "5", 18.1, "Blanco", "2", "1"),
	("2023-02-09", 5, "6", 17.5, "Rojo", "2", "1"),
	("2023-02-09", 5, "7", 18, "Blanco", "2", "1"),
	("2023-02-09", 5, "8", 17.4, "Rojo", "2", "1"),

	-- Rollo Mediano/Impreso 6
	("2023-02-09", 6, "1", 17, "Verde", "2", "1"),
	("2023-02-09", 6, "2", 17.7, "Blanco", "2", "1"),
	("2023-02-09", 6, "3", 17.6, "Verde", "2", "1"),
	("2023-02-09", 6, "4", 17.1, "Blanco", "2", "1"),
	("2023-02-10", 6, "5", 18.6, "Verde", "2", "1"),
	("2023-02-10", 6, "6", 17.2, "Blanco", "2", "1"),
	("2023-02-10", 6, "7", 18.1, "Verde", "2", "1"),
	("2023-02-10", 6, "8", 17.6, "Blanco", "2", "1")
;

-- I. Produccion
INSERT INTO inventario_produccion( fecha_registro, fk_rollo_mediano, fk_rollo_jumbo, fk_color, fk_producto, peso_producto, fk_usuario, estado_registro)
VALUES
    -- Rollo Mediano/Impreso 1 --
	("2023-01-03", 1, 1, "Rojo", 8, 0, 2, 1),
	("2023-01-03", 1, 1, "Rojo", 8, 0, 2, 1),
	("2023-01-03", 1, 1, "Rojo", 8, 0, 2, 1),
	("2023-01-03", 1, 1, "Rojo", 8, 0, 2, 1),
	("2023-01-03", 1, 1, "Rojo", 8, 0, 2, 1),
    
	("2023-01-03", 1, 2, "Rojo", 4, 0, 2, 1),
	("2023-01-03", 1, 2, "Rojo", 4, 0, 2, 1),
	("2023-01-03", 1, 2, "Rojo", 4, 0, 2, 1),
    
	("2023-01-03", 1, 3, "Rojo", 1, 14, 2, 1),

	("2023-01-03", 1, 4, "Rojo", 6, 2, 2, 1),
	("2023-01-03", 1, 4, "Rojo", 6, 1, 2, 1),
	("2023-01-03", 1, 4, "Rojo", 6, 2, 2, 1),
	("2023-01-03", 1, 4, "Rojo", 6, 2, 2, 1),

	("2023-01-03", 1, 5, "Rojo", 1, 14, 2, 1),
  
	("2023-01-03", 1, 6, "Rojo", 2, 0, 2, 1),

		-- Rollo Mediano/Impreso 2 --
	("2023-01-03", 2, 1, "Rojo", 3, 0, 2, 1),
	("2023-01-03", 2, 1, "Rojo", 3, 0, 2, 1),
	("2023-01-03", 2, 1, "Rojo", 3, 0, 2, 1),
	("2023-01-03", 2, 1, "Rojo", 3, 0, 2, 1),
	("2023-01-03", 2, 1, "Rojo", 3, 0, 2, 1),
    
	("2023-01-03", 2, 2, "Custom", 11, "1.5", 2, 1),
	("2023-01-03", 2, 2, "Custom", 11, "1.5", 2, 1),
	("2023-01-03", 2, 2, "Custom", 11, "1", 2, 1),

	("2023-01-03", 2, 3, "Rojo", 1, 15, 2, 1),

	("2023-01-03", 2, 4, "Custom", 6, 1, 2, 1),
	("2023-01-03", 2, 4, "Custom", 6, 2, 2, 1),
	("2023-01-03", 2, 4, "Custom", 6, 2, 2, 1),
	("2023-01-03", 2, 4, "Custom", 6, 2, 2, 1),

	("2023-01-03", 2, 5, "Rojo", 5, 0, 2, 1),
	("2023-01-03", 2, 5, "Rojo", 5, 0, 2, 1),
	("2023-01-03", 2, 5, "Rojo", 5, 0, 2, 1),

	("2023-01-03", 2, 6, "Custom", 9, 0, 2, 1),
	("2023-01-03", 2, 6, "Custom", 9, 0, 2, 1),
	("2023-01-03", 2, 6, "Custom", 9, 0, 2, 1),
	
	-- Rollo Mediano/Impreso 3 --
	("2023-01-04", 3, 1, "Custom", 1, 14, 2, 1),

	("2023-01-04", 3, 2, "Custom", 10, 1, 2, 1),
	("2023-01-04", 3, 2, "Custom", 11, 1, 2, 1),
	("2023-01-04", 3, 2, "Custom", 11, 2, 2, 1),

	("2023-01-04", 3, 3, "Custom", 3, 0, 2, 1),
	("2023-01-04", 3, 3, "Custom", 3, 0, 2, 1),
	("2023-01-04", 3, 3, "Custom", 3, 0, 2, 1),
	("2023-01-04", 3, 3, "Custom", 3, 0, 2, 1),
	("2023-01-04", 3, 3, "Custom", 3, 0, 2, 1),
	("2023-01-04", 3, 3, "Custom", 3, 0, 2, 1),

	("2023-01-04", 3, 4, "Custom", 6, 1, 2, 1),
	("2023-01-04", 3, 4, "Custom", 6, 1, 2, 1),
	("2023-01-04", 3, 4, "Custom", 6, 2, 2, 1),
	("2023-01-04", 3, 4, "Custom", 6, 2, 2, 1),

	("2023-01-04", 3, 5, "Custom", 2, 0, 2, 1),

	("2023-01-04", 3, 6, "Custom", 1, 14, 2, 1),

	("2023-01-04", 3, 7, "Custom", 1, 12, 2, 1),

	("2023-01-04", 3, 8, "Custom", 5, 0, 2, 1),
	("2023-01-04", 3, 8, "Custom", 5, 0, 2, 1),
	("2023-01-04", 3, 8, "Custom", 5, 0, 2, 1),

	-- Rollo Mediano/Impreso 4 --
	("2023-01-08", 4, 1, "Negro", 1, 13, 2, 1)
;