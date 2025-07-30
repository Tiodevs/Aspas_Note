import { Router } from 'express';
import { PhrasesController } from '../controllers/phrases.controller';
import { validate, validateParams } from '../middlewares/validation.middleware';
import { createPhraseSchema, updatePhraseSchema, phraseParamsSchema, userParamsSchema } from '../schemas/phrases.schemas';

const router = Router();
const phrasesController = new PhrasesController();

// Rota para frases por usuário (deve vir antes da rota /:id)
router.get('/user/:userId', validateParams(userParamsSchema), phrasesController.listPhrasesByUser.bind(phrasesController));

// Rotas para frases    
router.post('/', validate(createPhraseSchema), phrasesController.createPhrase.bind(phrasesController));

router.get('/', phrasesController.listPhrase.bind(phrasesController));

router.get('/:id', validateParams(phraseParamsSchema), phrasesController.getPhraseById.bind(phrasesController));

router.put('/:id', validateParams(phraseParamsSchema), validate(updatePhraseSchema), phrasesController.updatePhrase.bind(phrasesController));

router.delete('/:id', validateParams(phraseParamsSchema), phrasesController.deletePhrase.bind(phrasesController));

export default router; 
