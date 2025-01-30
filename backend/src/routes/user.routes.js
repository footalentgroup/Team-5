import express from 'express';  
import { registerUser, verifyEmail, loginUser, getUserInfo, updateUserInfo } from '../controllers/auth.controller.js';  
import avatarUpload from '../middlewares/avatar.middleware.js';  
import { authenticateJWT } from '../middlewares/auth.middleware.js';  

const router = express.Router();

/**
 * Ruta para registrar un nuevo usuario.
 * 
 * - Endpoint: `/register`
 * - Método: POST
 * - Middleware: `avatarUpload.single('avatar')` para subir el avatar del usuario.
 * - Controlador: `registerUser`
 */
router.post('/register', avatarUpload.single('avatar'), registerUser);

/**
 * Ruta para verificar la dirección de correo electrónico de un usuario.
 * 
 * - Endpoint: `/verify-email`
 * - Método: GET
 * - Controlador: `verifyEmail`
 */
router.get('/verify-email', verifyEmail);

/**
 * Ruta para iniciar sesión de un usuario.
 * 
 * - Endpoint: `/login`
 * - Método: POST
 * - Controlador: `loginUser`
 */
router.post('/login', loginUser);

/**
 * Ruta para actualizar la información del usuario.
 * 
 * - Endpoint: `/update`
 * - Método: PUT
 * - Middleware:
 *   - `authenticateJWT`: verifica que el usuario esté autenticado mediante JWT.
 *   - `avatarUpload.single('avatar')`: permite actualizar el avatar del usuario.
 * - Controlador: `updateUserInfo`
 */
router.put('/update', authenticateJWT, avatarUpload.single('avatar'), updateUserInfo);

/**
 * Ruta para obtener la información del usuario autenticado.
 * 
 * - Endpoint: `/user`
 * - Método: GET
 * - Middleware: `authenticateJWT` para validar el token de autenticación.
 * - Controlador: `getUserInfo`
 */
router.get('/user', authenticateJWT, getUserInfo);

export default router;
