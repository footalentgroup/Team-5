export const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err.message}`);

    // Definir el código de estado por defecto
    const statusCode = err.statusCode || 500;

    // Responder con el error formateado
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};
