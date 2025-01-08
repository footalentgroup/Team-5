import express from 'express';
import passport from 'passport';
import { generateToken } from '../controllers/auth.controller.js';

const router = express.Router();

// Endpoint para iniciar la autenticación con Discord
router.get('/', passport.authenticate('discord'));

// Endpoint callback discord
router.get('/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => {
    const token = generateToken(req.user);  // Generar el token JWT
    res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token}`); // Redirigir al frontend con el token
});

export default router;
