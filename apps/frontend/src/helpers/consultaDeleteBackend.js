import axios from 'axios';

export const consultaDeleteBackend = async (event, endpoint, data_id) => {
  event.preventDefault();

  try {
    const response = await axios.patch(`${endpoint}/${data_id}`);
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
}