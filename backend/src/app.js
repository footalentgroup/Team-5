import express from 'express';
import passport from 'passport';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes.js'
import authDiscordRoutes from './routes/auth-discord.routes.js';
import mongoDB from './config/db.js';
import './passport.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Configura __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar las variables de entorno
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(session({
  secret: 'tu_clave_secreta',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// Sirve archivos estáticos desde la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth/discord', authDiscordRoutes);

// Conexión a la base de datos
mongoDB();

// Puerto de la aplicación
const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`El servidor se está ejecutando en el puerto: ${port}`);
});
