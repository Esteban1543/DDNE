import axios from 'axios';

const consultaGetBackend = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return {
      response, 
      success: true
    }
  }
  catch (error) {
    // alert(`Error en Consulta Backend a: ${endpoint} >> ${error.message}. Verifique la consola para mayor Información.`);
    console.error('Error al obtener datos en:', endpoint, ' >> >> >> ', error.response);

    return{
      response: 'error',
      success: false
    }
  }
}

export default consultaGetBackend;