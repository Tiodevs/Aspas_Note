
import prisma from '../../prisma/client';
import { Phrase } from '../../types/frases.types';

export class PhrasesService {


    async createPhrase(phrase: string, author: string, tags: string[], userId: string): Promise<Phrase> {
        const newPhrase = await prisma.phrase.create({
            data: {
                phrase,
                author,
                tags,
                userId
            }
        });
        return newPhrase;
    }

    async listPhrase(): Promise<Phrase[]> {
        const phrases = await prisma.phrase.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return phrases;
    }

    async listPhrasesByUser(userId: string): Promise<Phrase[]> {
        const phrases = await prisma.phrase.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return phrases;
    }

    async getPhraseById(id: string): Promise<Phrase | null> {
        const phrase = await prisma.phrase.findUnique({
            where: { id },
        });
        return phrase;
    }

    async updatePhrase(id: string, phrase: string, author: string, tags: string[]): Promise<Phrase> {
        const updatedPhrase = await prisma.phrase.update({
            where: { id },
            data: {
                phrase,
                author,
                tags
            }
        });
        return updatedPhrase;
    }

    async deletePhrase(id: string): Promise<void> {
        await prisma.phrase.delete({
            where: { id }
        });
    }
}