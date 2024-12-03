import express from 'express';
import dotenv from 'dotenv';

// Configurar dotenv para manejar variables de entorno
dotenv.config();

const app = express();

const port = process.env.PORT || 6000;

// Inicializar el servidor con manejo de errores
app.listen(port, (error) => {
    if (error) {
        console.error(`Error al iniciar el servidor: ${error.message}`);
    } else {
        console.log(`El servidor se está ejecutando en el puerto: ${port}`);
    }
});
