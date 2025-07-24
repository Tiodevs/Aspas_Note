import { Router } from 'express';
import { PhrasesController } from '../controllers/phrases.controller';
import { validate, validateParams } from '../middlewares/validation.middleware';
import { createPhraseSchema, updatePhraseSchema, phraseParamsSchema, userParamsSchema } from '../schemas/phrases.schemas';

const router = Router();
const phrasesController = new PhrasesController();

// Rota para frases por usuário (deve vir antes da rota /:id)
router.get('/user/:userId', validateParams(userParamsSchema), async (req, res) => {
    await phrasesController.listPhrasesByUser(req, res);
});

// Rotas para frases    
router.post('/', validate(createPhraseSchema), async (req, res) => {
    await phrasesController.createPhrase(req, res);
});

router.get('/', async (req, res) => {
    await phrasesController.listPhrase(req, res);
});

router.get('/:id', validateParams(phraseParamsSchema), async (req, res) => {
    await phrasesController.getPhraseById(req, res);
});

router.put('/:id', validateParams(phraseParamsSchema), validate(updatePhraseSchema), async (req, res) => {
    await phrasesController.updatePhrase(req, res);
});

router.delete('/:id', validateParams(phraseParamsSchema), async (req, res) => {
    await phrasesController.deletePhrase(req, res);
});

export default router; 
