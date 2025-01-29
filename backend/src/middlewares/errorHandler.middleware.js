/**
 * Middleware de manejo de errores para la aplicación.
 * 
 * Este middleware captura cualquier error que ocurra durante la ejecución de las rutas
 * o en otros middlewares y formatea la respuesta de error.
 *
 * @param {object} err - Objeto de error capturado.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar al siguiente middleware.
 */
export const errorHandler = (err, req, res, next) => {
    // Mostrar el mensaje de error en la consola para depuración
    console.error(`Error: ${err.message}`);

    /**
     * Código de estado HTTP de la respuesta.
     * Si no está definido en el objeto de error, se utiliza el valor por defecto 500 (Error interno del servidor).
     */
    const statusCode = err.statusCode || 500;

    /**
     * Enviar la respuesta de error en formato JSON.
     * - `success`: indica que la operación no fue exitosa.
     * - `message`: mensaje del error.
     * - `stack`: muestra el stack del error solo en entorno de desarrollo para facilitar la depuración.
     */
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
};
