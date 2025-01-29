import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes.js'
import authDiscordRoutes from './routes/auth-discord.routes.js';
import mongoDB from './config/db.js';
import './passport.js';
import teamRoutes from './routes/team.routes.js';
import eventRoutes from './routes/event.routes.js';
import communityRoutes from './routes/community.routes.js';
import searchRoutes from './routes/search.routes.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Middleware para parsear el cuerpo de las solicitudes HTTP en formato JSON
app.use(express.json());

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
// Permite que las solicitudes desde el frontend (especificado en FRONTEND_URL) puedan interactuar con el servidor backend
app.use(cors({
  origin: process.env.FRONTEND_URL,  // Se especifica la URL de frontend permitida para solicitudes
  credentials: true                  // Permite el uso de cookies entre dominios
}));

// Middleware para manejar la sesión de usuario
app.use(session({
  secret: process.env.SESSION_SECRET, // Se define la clave secreta para firmar las sesiones
  resave: false,                     // No resguardar sesiones si no se han modificado
  saveUninitialized: false,          // No guardar sesiones no inicializadas
  cookie: {
    secure: process.env.NODE_ENV === 'production',  // Configuración de seguridad para cookies en producción
    maxAge: 24 * 60 * 60 * 1000,                     // Duración de la cookie (1 día)
  },
}));

// Inicialización de Passport y manejo de sesiones
app.use(passport.initialize());
app.use(passport.session());

// Rutas de la aplicación que gestionan las diferentes funcionalidades del sistema
app.use('/api/users', userRoutes);                 // Ruta para gestionar usuarios
app.use('/api/auth/discord', authDiscordRoutes);    // Ruta para autenticación con Discord
app.use('/api/teams', teamRoutes);                  // Ruta para gestionar equipos
app.use('/api/events', eventRoutes);                // Ruta para gestionar eventos
app.use('/api/community', communityRoutes);        // Ruta para gestionar comunidades
app.use('/api', searchRoutes);                     // Ruta para realizar búsquedas

// Middleware global para manejar los errores en la aplicación
app.use(errorHandler);

// Conexión a la base de datos MongoDB
mongoDB();

// Configuración del puerto de la aplicación y escucha del servidor
const port = process.env.PORT || 6000;  // Se establece el puerto desde las variables de entorno o un valor por defecto
app.listen(port, () => {
  console.log(`El servidor se está ejecutando en el puerto: ${port}`);
});