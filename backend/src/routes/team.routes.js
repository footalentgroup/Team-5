import express from 'express';
import teamUpload from '../middlewares/team.middleware.js';
import { createTeam } from '../controllers/team.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';
import { getTeams } from '../controllers/team.controller.js';

const router = express.Router();

// Endpoint para crear un equipo, usando el middleware de carga de imagen y autenticación JWT
router.post('/create',  authenticateJWT, teamUpload.single('coverPhoto'), createTeam);

// Endpoint de obtener de equipos
router.get('', getTeams);

export default router;