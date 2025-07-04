import { Request, Response } from 'express';
import { PhrasesService } from '../services/phrases/phrases.service';
import { Phrase } from '../types/frases.types';

// Instância do serviço de usuário
const phrasesService = new PhrasesService();

export class PhrasesController {
    async createPhrase(req: Request, res: Response) {
        const { phrase, author, tags } : Phrase = req.body;
        const phraseCreated = await phrasesService.createPhrase(phrase, author, tags);
        res.status(201).json(phraseCreated);
    }

    async listPhrase(req: Request, res: Response) {
        const phrases = await phrasesService.listPhrase();
        res.status(200).json(phrases);
    }
}