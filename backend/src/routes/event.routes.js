import express from 'express';
import eventUpload from '../middlewares/event.middleware.js';
import { createEvent } from '../controllers/event.controller.js';
import { authenticateJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', authenticateJWT, eventUpload.single('coverPhoto'), createEvent);

export default router;