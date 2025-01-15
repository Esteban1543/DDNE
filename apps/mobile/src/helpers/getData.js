import solicitudGet from "./SolicitudGet";

//🔸 Función para realizar Solicitudes GET a Backend y pasar configurar usestate
export const getData = async (endpoint, setData) => {
  const { response, success } = await solicitudGet(endpoint);
  success ? setData(response.data.data) : setData([]);
}