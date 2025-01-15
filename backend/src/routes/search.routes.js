import express from 'express';
import { searchHandler } from '../controllers/search.controller.js';

const router = express.Router();

//Endpoint para realizar búsquedas 
router.get('/search', searchHandler);

export default router;