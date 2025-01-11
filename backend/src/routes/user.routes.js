import express from 'express';
import { registerUser, verifyEmail, loginUser, getUserInfo } from '../controllers/auth.controller.js';
import avatarUpload from '../middlewares/avatar.middleware.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Endpoint para registrar usuario
router.post('/register', avatarUpload.single('avatar'), registerUser);

// Endpoint para verificación de correo electrónico
router.get('/verify-email', verifyEmail);

// Endpoint para login de usuario
router.post('/login', loginUser);

// Endpoint para obtener la información del usuario autenticado
router.get('/user', authenticateJWT, getUserInfo);

// Endpoint para subir un avatar
router.post('/upload-avatar', avatarUpload.single('avatar'), (req, res) => {
    try {
        const avatarUrl = req.file.path; // URL generada por Cloudinary
        res.status(200).json({ message: 'Avatar subido exitosamente', avatarUrl });
    } catch (error) {
        console.error('Error al subir el avatar:', error);
        res.status(500).json({ message: 'Error al subir el avatar' });
    }
});

export default router;
