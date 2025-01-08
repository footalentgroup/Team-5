import express from 'express';
import communityUpload from '../middlewares/community.middleware.js';
import { createCommunity, subscribeToCommunity } from '../controllers/community.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Ruta para crear una comunidad
router.post('/create', authenticateJWT, communityUpload.single('coverPhoto'), createCommunity);

// Ruta para suscribirse a una comunidad
router.post('/:communityId/subscribe', authenticateJWT, subscribeToCommunity);

export default router;