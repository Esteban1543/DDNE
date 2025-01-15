import fs from 'fs';

//🔸 Función para eliminar un archivo
export const eliminarArchivo = (rutaArchivo) => {

  // Utiliza fs.unlink para eliminar el archivo
  fs.unlink(rutaArchivo, (error) => {
    if (error) {
      console.error('❌ Error al eliminar el archivo: ', error);
      return;
    }

    console.log('Archivo eliminado correctamente ✅');
    return

  });
};