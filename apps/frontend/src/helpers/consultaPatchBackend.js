
import axios from 'axios';

const consultaPatchBackend = async (e, endpoint, formData) => {
  e.preventDefault();

  try {
    const response = await axios.patch(endpoint, formData);
    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
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

export default consultaPatchBackend;
