import { Router } from 'express';
import { PhrasesController } from '../controllers/phrases.controller';

const phrasesController = new PhrasesController();

const router = Router();

router.post('/', phrasesController.createPhrase);
router.get('/', phrasesController.listPhrase);

export default router; 
