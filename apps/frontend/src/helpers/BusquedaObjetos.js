
export const handleSearch = async (input, data) => {
  const coincidencias = [];
  const input_lowerCase = input.toLowerCase();
  
  if(input.trim() === "") return null;

  await data.forEach((object, i) => {

    //🔹 Iterar las propiedades de cada Objeto
    for (const clave in object){    
      const value = object[clave] + ''; // Añadimos el + '' para que el value se convierta en un String sin tener que validar si es null, undefined u otro que no funcione con el método toString().
      // console.log(clave, value, typeof(value))
  
      if(!!value && value.toLowerCase().includes(input_lowerCase)) return coincidencias.push(object)      
    }
  })
  return  coincidencias.length > 0 ? coincidencias : null;
}