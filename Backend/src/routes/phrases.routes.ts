import { Router } from 'express';
import { PhrasesController } from '../controllers/phrases.controller';

const router = Router();
const phrasesController = new PhrasesController();

// Rota para frases por usuário (deve vir antes da rota /:id)
router.get('/user/:userId', async (req, res) => {
    await phrasesController.listPhrasesByUser(req, res);
});

// Rotas para frases
router.post('/', async (req, res) => {
    await phrasesController.createPhrase(req, res);
});

router.get('/', async (req, res) => {
    await phrasesController.listPhrase(req, res);
});

router.get('/:id', async (req, res) => {
    await phrasesController.getPhraseById(req, res);
});

router.put('/:id', async (req, res) => {
    await phrasesController.updatePhrase(req, res);
});

router.delete('/:id', async (req, res) => {
    await phrasesController.deletePhrase(req, res);
});

export default router; 
