
//🔸 Función para realizar Paginación
export const getPage = (data, paginaActual, registrosPorPagina) => {
  const registroInicial = (paginaActual - 1) * registrosPorPagina;
  const registroFinal = registroInicial + registrosPorPagina;
  // console.log('data >> ', data);
  return data.slice(registroInicial, registroFinal);
};

export const goPage = (numeroPagina, setData) => {
  setData(numeroPagina);
};