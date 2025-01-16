// Importaciones necesarias para las funcionalidades del servidor
import express from 'express'; // Framework para crear el servidor y definir rutas
import { registerUser, verifyEmail, loginUser, getUserInfo, updateUserInfo } from '../controllers/auth.controller.js'; // Controladores que gestionan las acciones relacionadas con los usuarios
import avatarUpload from '../middlewares/avatar.middleware.js'; // Middleware para gestionar la carga del avatar
import { authenticateJWT } from '../middlewares/auth.middleware.js'; // Middleware para autenticar los usuarios con JWT

// Crear un router de Express para manejar las rutas de autenticación
const router = express.Router();

// **Ruta para registrar un usuario nuevo**
// El endpoint se activa con una solicitud POST a /register
// Se usa el middleware `avatarUpload.single('avatar')` para procesar la carga de un archivo (avatar) antes de pasar la solicitud al controlador `registerUser`.
router.post('/register', avatarUpload.single('avatar'), registerUser);

// **Ruta para actualizar la información de un usuario**
// Esta ruta se activa con una solicitud PUT a /update
// Se usa el middleware `authenticateJWT` para asegurar que el usuario esté autenticado (verificando el JWT en la cabecera).
// También se utiliza el middleware `avatarUpload.single('avatar')` para cargar un nuevo avatar si es proporcionado.
router.put('/update', authenticateJWT, avatarUpload.single('avatar'), updateUserInfo);

// **Ruta para verificar el correo electrónico de un usuario**
// Se activa con una solicitud GET a /verify-email, y usa el controlador `verifyEmail` para manejar la verificación del token de correo.
router.get('/verify-email', verifyEmail);

// **Ruta para el inicio de sesión de un usuario**
// Esta ruta se activa con una solicitud POST a /login
// El controlador `loginUser` maneja la autenticación del usuario con el username y la contraseña.
router.post('/login', loginUser);

// **Ruta para obtener la información del usuario autenticado**
// Se activa con una solicitud GET a /user
// Se usa el middleware `authenticateJWT` para verificar que el usuario esté autenticado antes de devolver su información.
router.get('/user', authenticateJWT, getUserInfo);

// Exportamos el router para que pueda ser utilizado en otros archivos, como el archivo principal de configuración de rutas del servidor.
export default router;
