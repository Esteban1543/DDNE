//♨️ Importar Mysql2
import { createConnection } from 'mysql2';

//🔸 Crear Conexión
import { DB_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from '../config.js';
const connection = createConnection({
    port: DB_PORT,
    host : DB_HOST,    
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    charset: 'utf8mb4_general_ci'
});

//🔸 Respuesta de Solicitud Conexión
function connectWithRetry() {
    connection.connect((err) => {
        if (err) {
            console.log(`Error al Conectar con MySQL: ${err} ❌`);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log(`Conexión Exitosa con DB: ${connection.config.database} ✅`);
        }
    });
}

connectWithRetry();

//🔸 Terminar Conexión al intentar cerrar la consola
process.on('SIGINT', () => {
    console.log('⛔ Conexión Terminada con MySQL');
    connection.end();
})

//🔸 Exportar Conexión
export default connection;