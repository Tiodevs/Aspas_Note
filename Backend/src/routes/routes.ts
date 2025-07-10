import express from 'express';

// Rotas
import phrasesRoutes from './phrases.routes';

const router = express.Router();

// Registrar as rotas individuais
router.use('/phrases', phrasesRoutes);

export default router; 