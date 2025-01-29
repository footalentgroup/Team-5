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

// Cargar las variables de entorno
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth/discord', authDiscordRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/community', communityRoutes);
app.use('/api', searchRoutes);

// Manejador de errores (middleware)
app.use(errorHandler);

// Conexión a la base de datos
mongoDB();

// Puerto de la aplicación
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`El servidor se está ejecutando en el puerto: ${port}`);
});
