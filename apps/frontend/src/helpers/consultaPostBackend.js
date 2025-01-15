
import axios from 'axios';

const consultaPostBackend = async (e, endpoint, formData) => {

  e.preventDefault();

  try {
    const response = await axios.post(endpoint, formData, {
      validateStatus: function (status) {
          return status < 500; // Resuelve error solo si el código de estado es 5xx
      }});
    if (response.data.success) {
      return {
        success: true,
        message: '✅ Solicitud Satisfactoría !!',
      };
    } else {
      return {
        success: false,
        message: `❌ Error en la Solicitud`,
        error: `⛔ Error al enviar datos: ${response.data.message}`
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Ha ocurrido un Error interno 👾',
      error: `⛔ Error al enviar datos: ${error.message}`
    };
  }
};

export default consultaPostBackend;
