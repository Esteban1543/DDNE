
//♨️ Configurar Router de Express
import { Router } from "express";
const router = Router();

/*//////////////////////////////////// 
        Interfaz de la API 📌
////////////////////////////////////*/
import { URI } from "../config.js";
router.get(['/', '/index'], (req, res) => res.render('index.ejs', { URI }));

/*//////////////////////////////////// 
            Autenticación 📌
////////////////////////////////////*/

import { login } from '../controllers/inicio-sesion.js';
router.post('/login', login);

import { logout } from "../controllers/cierre-sesion.js";
router.post('/cerrar-sesion', logout);

/*/////////////////////////////////////// 
            Gráficos de Inicio 📌
//////////////////////////////////////*/

import { DataCharts } from "../controllers/graficos.js";
router.get('/data-charts', DataCharts);

/*/////////////////////////////////////// 
        Exportaciones Routers 📌
//////////////////////////////////////*/
import router_inventarios from './inventarios.js';
import router_contabilidad from './contabilidad.js';
import router_personas from './personas.js';

export {
    router,
    router_inventarios,
    router_contabilidad,
    router_personas
};