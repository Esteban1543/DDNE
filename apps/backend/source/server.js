
//♨️ Importaciones
import express, { urlencoded, static as ExpressStatic } from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import swaggerDocs from '../documentation/openapi.js';

//🔸 Hacer uso de Express
var app = express();
app.disable ('x-powered-by');

//🔸 Configurar rutas estáticas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//🔸 configuración archivos Estáticos
app.use(ExpressStatic(__dirname + '/public'));

//🔸 Motor Plantillas para renderizado de Servidor
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//🔸 Procesamiento de Datos desde HTML (forms)
app.use(urlencoded({extended:false})); //Leer URLS
app.use(express.json()); //Leer Body

//🔸 Habilitar CORS en los Encabezados
app.use(cors());
// app.use(cors({ 
//   origin: ['http://localhost:3000', 'http://localhost:3000/home',  'http://localhost:3000/dashboard',
//            'http://localhost:3001', 'http://localhost:3001/home', 'http://localhost:3001/dashboard'], 
//   credentials: true 
// }));

//🔸 Uso y configuración de Cookies y Sesiones
app.use(cookieParser());

app.use(session({
  secret: '741258963',
  resave: false, // Evitar que se guarde la sesión en cada solicitud
  saveUninitialized: true, // Guardar sesiones aún si no se han modificado
  cookie: {
    sameSite: 'lax',
    secure: false, 
    maxAge: 3600000, // Tiempo en milisegundos (1 hora)
  }
}));

//🔸 Importar el Router
import {router, router_inventarios, router_contabilidad, router_personas} from './routes/router.js';
app.use('/', router);
app.use('/inv', router_inventarios);
app.use('/', router_contabilidad);
app.use('/', router_personas);

//🔸 Puerto
import { PORT, URI } from './config.js';
app.listen(PORT, (req, res)=>{
    console.log('↗️  Puerto disponible: ',  PORT !== 5000 ? PORT : URI );
    swaggerDocs(app, PORT);
});