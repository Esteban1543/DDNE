//♨️ Configurar Router de Express
import { Router } from "express";
const router = Router();

//♨️ Exportar
export default router;

//♨️ Middelware Multer para carga de Archivos
import { handleFileUpload } from "../middelwares/multer.js";

/*/////////////////////////////////////// 
    Endpoints para solicitudes GET  🧩
//////////////////////////////////////*/

import { initialView_transaccionesCompras, initialView_transaccionesVentas, initialView_products, initialTipe_Insumo, initialTipe_producto, infInventory } from '../controllers/modulo_Contabilidad/consultas.js';

router.post('/generarInfInv', infInventory);

router.get('/transacciones-compras', initialView_transaccionesCompras);
router.get('/transacciones-ventas', initialView_transaccionesVentas);

router.get('/productos', initialView_products);

router.get('/tipo_productos', initialTipe_producto);

router.get('/tipo_insumo', initialTipe_Insumo);

/*/////////////////////////////////////
    Endpoints para Inserciones POST  🧩
/////////////////////////////////////*/

import { newTransaccion } from '../controllers/modulo_Contabilidad/inserciones.js';

// router.post('/registro-transaccion', upload.single('archivo'), newTransaccion);
router.post('/registro-transaccion', handleFileUpload, newTransaccion);

// router.post('/createproduct', newProduct);

// router.post('/infInvInsumosView', infInvInsumosView);


/*//////////////////////////////////////
    Endpoints para Actualizaciones  🧩
/////////////////////////////////////*/

import { editarProducto, update_Transacciones } from '../controllers/modulo_Contabilidad/actualizaciones.js'
// import { infInvInsumosView } from "../controllers/modulo_Contabilidad/consultas.js";

router.put('/update-Product/:id', editarProducto);

router.put('/update_Transacciones', update_Transacciones);


/*/////////////////////////////////// 
    Endpoints para Eliminaciones  🧩   
///////////////////////////////////*/

