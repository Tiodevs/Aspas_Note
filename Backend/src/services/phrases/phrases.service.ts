
import prisma from '../../prisma/client';
import { CreatePhraseInput, UpdatePhraseInput, PhraseResponse } from '../../schemas/phrases.schemas';

export class PhrasesService {


    async createPhrase(phrase: string, author: string, tags: string[], userId: string): Promise<CreatePhraseInput> {
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

    async listPhrase(): Promise<PhraseResponse[]> {
        const phrases = await prisma.phrase.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return phrases;
    }

    async listPhrasesByUser(userId: string): Promise<PhraseResponse[]> {
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

    async getPhraseById(id: string): Promise<PhraseResponse | null> {
        const phrase = await prisma.phrase.findUnique({
            where: { id },
        });
        return phrase;
    }

    async updatePhrase(id: string, updateData: UpdatePhraseInput): Promise<PhraseResponse> {
        const updatedPhrase = await prisma.phrase.update({
            where: { id },
            data: updateData
        });
        return updatedPhrase;
    }

    async deletePhrase(id: string): Promise<void> {
        await prisma.phrase.delete({
            where: { id }
        });
    }
}