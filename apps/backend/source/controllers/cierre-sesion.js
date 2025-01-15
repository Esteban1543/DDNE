
export const logout = (req, res) => {

  req.session.destroy((error) => {    

    if (error) {
      console.log('Error al intentar cerrar Sesión en Backend >> ', error);

      res.status(500).json({
        success: false,
        message: 'Error interno del servidor al intentar Cerrar Sesión en API',
        error: error.message
      });
      return;
    }

    console.log('Sesión Cerrada Exitosamente');
    res.json({
      success: true,
      message: "Sesión Cerrada ✅"
    });

  });
}