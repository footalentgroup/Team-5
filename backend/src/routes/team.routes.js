import express from 'express';
import teamUpload from '../middlewares/team.middleware.js';
import { createTeam } from '../controllers/team.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Endpoint para crear un equipo, usando el middleware de carga de imagen y autenticación JWT
router.post('/create', authenticateJWT, teamUpload.single('coverPhoto'), createTeam);

export default router;