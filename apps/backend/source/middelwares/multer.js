import multer from 'multer';

//🔸 Tipos de Archivos permitidos
const mimetypes = ['application/pdf']; // ['text/plain']

//🔸 Configuración de multer (almacenamiento, nombre, limites)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/transacciones'); // directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    mimetypes.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error('Solo se permiten archivos PDF'))
      ;
  },
  limits: {
    fieldNameSize: 50, // 50 bytes
    fields: 5, // Campos o Inputs relacionados del formulario que envian junto al archivo
    fileSize: 1024 * 1024 * 2, // 2 megabytes(2MB)
    // fieldSize: 2000000, // 2 megabytes(2MB)
  },
});


//♨️ Middleware para ejecutar el controlador y esperar su respuesta para despues cargar el archivo
export function handleFileUpload(req, res, next) {
  upload.single('archivo')(req, res, function (err) {
    //🔹 Errores de Multer segun los limites establecidos
    if (err) {
      console.log('📌 Error de multer >> ', err);

      res.status(400).json({
        success: false,
        error: 'Error en la carga del archivo',
        message: err.message == 'Field value too long' ? 'El archivo excede el peso permitido de 2MB' : err.message
      });
      return
    }

    next();
  });
}