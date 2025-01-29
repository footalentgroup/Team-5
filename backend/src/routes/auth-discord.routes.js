import express from 'express';
import passport from 'passport';
import { generateToken } from '../utils/auth.util.js';

const router = express.Router();

/**
 * Ruta para iniciar el proceso de autenticación con Discord.
 * 
 * - Endpoint: `/`
 * - Método: GET
 * - Middleware: `passport.authenticate('discord')` que redirige al usuario a la página de inicio de sesión de Discord.
 */
router.get('/', passport.authenticate('discord'));

/**
 * Ruta de callback después de la autenticación con Discord.
 * 
 * - Endpoint: `/callback`
 * - Método: GET
 * - Middleware: `passport.authenticate('discord', { failureRedirect: '/' })` que maneja la autenticación y redirige en caso de fallo.
 * - Lógica adicional:
 *   - Si la autenticación es exitosa, se genera un token JWT usando `generateToken` y se redirige al frontend con el token como parámetro.
 *   - Si no se autenticó correctamente, se responde con un error 401.
 */
router.get('/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), 
    (req, res) => {
        // Verifica que el usuario esté autenticado
        if (!req.user) {
            return res.status(401).json({ message: 'Error en la autenticación' });
        }

        // Generar un token JWT para el usuario autenticado
        const token = generateToken(req.user);

        // Redirigir al frontend con el token de autenticación
        res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`);
    }
);

export default router;
