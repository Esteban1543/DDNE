import axios from 'axios';

export const solicitudGet = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return {
      response, 
      success: true
    }
  }
  catch (error) {
    console.error('Error al obtener datos en:', endpoint, ' >> >> >> ', error.response);

    return{
      response: 'error',
      success: false
    }
  }
}