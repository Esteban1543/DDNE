//♨️ Configurar Router de Express
import { Router } from "express";
const router = Router();

//♨️ Exportar
export default router;

/*/////////////////////////////////////// 
    Endpoints para solicitudes GET  🧩
//////////////////////////////////////*/

import { initialView_invInsumos, initialView_invProduccion, initialView_rollosMedianos, initialView_invProduccion_id, initialView_rollosJumbo_id, initialView_rollosJumbo } from '../controllers/modulo_Inventarios/consultas.js';

router.get('/insumos', initialView_invInsumos);

router.get('/medianos', initialView_rollosMedianos);

router.get('/jumbos', initialView_rollosJumbo);
router.get('/jumbos/:idRolloMediano', initialView_rollosJumbo_id);

router.get('/produccion', initialView_invProduccion);
router.get('/produccion/:idRolloMediano/:idRolloJumbo', initialView_invProduccion_id);

/*/////////////////////////////////////
    Endpoints para Inserciones POST  🧩
/////////////////////////////////////*/
 
import { newRegistrationSupplies, newRegistrationMediumRolls, newRegistrationJumboRolls, newRegistrationProduction } from '../controllers/modulo_Inventarios/inserciones.js';

router.post('/insumos', newRegistrationSupplies);

router.post('/medianos', newRegistrationMediumRolls);

router.post('/jumbos', newRegistrationJumboRolls);

router.post('/produccion', newRegistrationProduction);

/*//////////////////////////////////////
    Endpoints para Actualizaciones  🧩
/////////////////////////////////////*/
  
import { UpdateRegistrationSupplies, UpdateRegistrationMediumRolls, UpdateRegistrationJumboRolls, UpdateRegistrationProduction } from '../controllers/modulo_Inventarios/actualizaciones.js'

router.patch('/Insumos/:id', UpdateRegistrationSupplies);

router.patch('/medianos/:id', UpdateRegistrationMediumRolls);

router.patch('/jumbos/:idRolloMediano/:idRolloJumbo', UpdateRegistrationJumboRolls);

router.patch('/produccion/:idInvProduccion', UpdateRegistrationProduction);

/*/////////////////////////////////// 
    Endpoints para Eliminaciones  🧩   
///////////////////////////////////*/
  
import { UnableRegistrationSupplies, UnableRegistrationMediumRolls, UnableRegistrationJumboRolls, UnableRegistrationProduction } from '../controllers/modulo_Inventarios/eliminaciones.js';

router.patch('/insumos-delete/:id', UnableRegistrationSupplies);

router.patch('/medianos-delete/:id', UnableRegistrationMediumRolls);

router.patch('/jumbos-delete/:idRolloMediano/:idRolloJumbo', UnableRegistrationJumboRolls);

router.patch('/produccion-delete/:id', UnableRegistrationProduction);