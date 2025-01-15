//♨️ Configurar Router de Express
import { Router } from "express";
const router = Router();

//♨️ Exportar
export default router;

/*/////////////////////////////////////// 
    Endpoints para solicitudes GET  🧩
//////////////////////////////////////*/

import { initialView_providers, initialView_clients, initialView_users, initial_Permisos, initial_tipo_identificacion } from '../controllers/modulo_Personas/consultas.js';

router.get('/proveedores', initialView_providers);

router.get('/clientes', initialView_clients);

router.get('/usuarios', initialView_users);

router.get('/permisos', initial_Permisos);

router.get('/tipo_identificacion', initial_tipo_identificacion);

/*/////////////////////////////////////
    Endpoints para Inserciones POST  🧩
/////////////////////////////////////*/

import { newUser, newClient, newProvider } from '../controllers/modulo_Personas/inserciones.js';

router.post('/createuser', newUser);

router.post('/createclient', newClient);

router.post('/createprovider', newProvider);

/*//////////////////////////////////////
    Endpoints para Actualizaciones  🧩
/////////////////////////////////////*/
 
import { updateclient, updateProvider } from '../controllers/modulo_Personas/actualizaciones.js';

router.put('/updateprovider/:id', updateProvider);

router.put('/updateclient', updateclient);

// update user PENDIENTE

/*/////////////////////////////////// 
    Endpoints para Eliminaciones  🧩   
///////////////////////////////////*/

//🔸 MODULO PERSONAS
import { Deleteprovider, DeleteClient, delete_Usuario } from "../controllers/modulo_Personas/eliminaciones.js";

router.put('/deleteprovider/:id', Deleteprovider);

router.put('/deleteClient/:id', DeleteClient);

router.patch('/delete_Usuario/:id', delete_Usuario);