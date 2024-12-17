import express from 'express';
import { registerUser, verifyEmail, loginUser, getUserInfo } from '../controllers/auth.controller.js';
import upload from '../config/multer-config.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Ruta para registrar usuario
router.post('/register', upload.single('avatar'), registerUser);

// Ruta para verificación de correo electrónico
router.get('/verify-email', verifyEmail);

// Ruta para login de usuario
router.post('/login', loginUser);

// Endpoint para obtener la información del usuario autenticado
router.get('/user', authenticateJWT, getUserInfo);

export default router;
