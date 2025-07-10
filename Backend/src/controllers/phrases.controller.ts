import { Request, Response } from 'express';
import { PhrasesService } from '../services/phrases/phrases.service';
import { CreatePhraseDto } from '../types/frases.types';

// Instância do serviço de frases
const phrasesService = new PhrasesService();

export class PhrasesController {
    async createPhrase(req: Request, res: Response) {
        try {
            const { phrase, author, tags, userId }: CreatePhraseDto = req.body;
            
            // Validação básica
            if (!phrase || !author || !userId) {
                return res.status(400).json({ 
                    error: 'Campos obrigatórios: phrase, author, userId' 
                });
            }

            const phraseCreated = await phrasesService.createPhrase(phrase, author, tags || [], userId);
            res.status(201).json(phraseCreated);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao criar frase' });
        }
    }

    async listPhrase(req: Request, res: Response) {
        try {
            const phrases = await phrasesService.listPhrase();
            res.status(200).json(phrases);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar frases' });
        }
    }

    async listPhrasesByUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const phrases = await phrasesService.listPhrasesByUser(userId);
            res.status(200).json(phrases);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao listar frases do usuário' });
        }
    }

    async getPhraseById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const phrase = await phrasesService.getPhraseById(id);
            
            if (!phrase) {
                return res.status(404).json({ error: 'Frase não encontrada' });
            }
            
            res.status(200).json(phrase);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar frase' });
        }
    }

    async updatePhrase(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { phrase, author, tags } = req.body;
            
            // Validação básica
            if (!phrase || !author) {
                return res.status(400).json({ 
                    error: 'Campos obrigatórios: phrase, author' 
                });
            }

            const updatedPhrase = await phrasesService.updatePhrase(id, phrase, author, tags || []);
            res.status(200).json(updatedPhrase);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar frase' });
        }
    }

    async deletePhrase(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await phrasesService.deletePhrase(id);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Erro ao deletar frase' });
        }
    }
}