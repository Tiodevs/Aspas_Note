import express from 'express';

// Rotas
import phrasesRoutes from './phrases.routes';

const router = express.Router();

// Registrar as rotas individuais
router.use('/frases', phrasesRoutes);

export default router; 