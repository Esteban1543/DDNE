// ♨️ Importaciones 
import { URI } from '../source/config.js';
import swaggerJSDoc from 'swagger-jsdoc';
import { setup, serve } from 'swagger-ui-express';

//🔸 Metada sobre la API
const configuracionSwagger = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DDNE Inventory | API",
      summary: "API desarrollada para el Aplicativo DDNE Inventory ",
      description: "La API DDNE, ha sido desarrollada para proporcionar diferentes recursos basados en la información almacenada en la Base de Datos. La estructura de la API se define con base a los modulos de Inventarios, Contabilidad y Personas donde la intención es modularizar el código de acuerdo a los apartados de cada módulo, esto garantiza que la información sea clara y fácil de consumir para el Aplicativo Cliente.",
      version: "1.0.0"
    },
    servers: [{
      url: `${URI}`
    }],
    tags: [
      {name: "Ⓜ️ Inventarios",
      description: "Inv Insumos, Inv Producción"},
      {name: "Ⓜ️ Contabilidad",
      description: "Informes, Transacciones, Productos"},
      {name: "Ⓜ️ Personas",
      description: "Proveedores, Clientes, Usuarios"}
    ]
  },
  apis: ['./documentation/docs/*.js']
};

//🔸 Styles 
const options = {
  customSiteTitle: "API DDNE",
  customfavIcon: "/images/favicon.png",
  customCssUrl: "/styles/swagger.css",
};

//🔸 Formato
const swaggerFormat = swaggerJSDoc(configuracionSwagger);


//🔸 Setup
const swaggerDocs = (app, port) => {
  app.use('/docs', serve, setup(swaggerFormat, options));
  // console.log(`📚 Documentacion disponible en: http://localhost:${port}/docs`);
}

export default swaggerDocs;