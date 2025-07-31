import { Request, Response } from 'express';
import { PhrasesService } from '../services/phrases/phrases.service';
import { CreatePhraseInput, UpdatePhraseInput } from '../schemas/phrases.schemas';

// Instância do serviço de frases
const phrasesService = new PhrasesService();


export class PhrasesController {
    createPhrase = async (req: Request, res: Response) => {
        try {
            const { phrase, author, tags, userId }: CreatePhraseInput = req.body;

            const phraseCreated = await phrasesService.createPhrase(phrase, author, tags, userId);
            res.status(201).json(phraseCreated);
        } catch (error) {
            console.error('Erro ao criar frase:', error);
            res.status(500).json({ 
                error: 'Erro interno do servidor',
                code: 'INTERNAL_ERROR' 
            });
        }
    }

    listPhrase = async (req: Request, res: Response) => {
        try {
            const phrases = await phrasesService.listPhrase();
            if (phrases.length === 0) {
                res.status(404).json({ 
                    error: 'Nenhuma frase encontrada',
                    code: 'PHRASE_NOT_FOUND' 
                });
                return;
            }
            res.status(200).json(phrases);
        } catch (error) {
            console.error('Erro ao listar frases:', error);
            res.status(500).json({ 
                error: 'Erro interno do servidor',
                code: 'INTERNAL_ERROR' 
            });
        }
    }

    listPhrasesByUser = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const phrases = await phrasesService.listPhrasesByUser(userId);
            res.status(200).json(phrases);
        } catch (error) {
            console.error('Erro ao listar frases do usuário:', error);
            res.status(500).json({ 
                error: 'Erro interno do servidor',
                code: 'INTERNAL_ERROR' 
            });
        }
    }

    getPhraseById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const phrase = await phrasesService.getPhraseById(id);
            
            if (!phrase) {
                res.status(404).json({ 
                    error: 'Frase não encontrada',
                    code: 'PHRASE_NOT_FOUND' 
                });
                return;
            }
            
            res.status(200).json(phrase);
        } catch (error) {
            console.error('Erro ao buscar frase:', error);
            res.status(500).json({ 
                error: 'Erro interno do servidor',
                code: 'INTERNAL_ERROR' 
            });
        }
    }

    updatePhrase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updateData: UpdatePhraseInput = req.body;

            const updatedPhrase = await phrasesService.updatePhrase(id, updateData);
            res.status(200).json(updatedPhrase);
        } catch (error: any) {
            console.error('Erro ao atualizar frase:', error);
            
            if (error.code === 'P2025') { // Prisma error code for record not found
                res.status(404).json({ 
                    error: 'Frase não encontrada',
                    code: 'PHRASE_NOT_FOUND' 
                });
                return;
            }
            
            res.status(500).json({ 
                error: 'Erro interno do servidor',
                code: 'INTERNAL_ERROR' 
            });
        }
    }

    deletePhrase = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await phrasesService.deletePhrase(id);
            res.status(204).send();
        } catch (error: any) {
            console.error('Erro ao deletar frase:', error);
            
            if (error.code === 'P2025') { // Prisma error code for record not found
                res.status(404).json({ 
                    error: 'Frase não encontrada',
                    code: 'PHRASE_NOT_FOUND' 
                });
                return;
            }
            
            res.status(500).json({ 
                error: 'Erro interno do servidor',
                code: 'INTERNAL_ERROR' 
            });
        }
    }
}