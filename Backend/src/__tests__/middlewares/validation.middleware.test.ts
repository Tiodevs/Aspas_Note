import { Request, Response } from 'express';
import { validate } from '../../middlewares/validation.middleware';
import { createPhraseSchema } from '../../schemas/phrases.schemas';

describe('Validation Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockNext = jest.fn();
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  test('deve passar para o próximo middleware quando dados são válidos', () => {
    mockReq = {
      body: {
        phrase: 'Frase válida com pelo menos 5 caracteres',
        author: 'Autor Teste',
        tags: ['teste'],
        userId: 'c123456789012345678901234'
      }
    };

    validate(createPhraseSchema)(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  test('deve retornar erro 400 quando phrase está faltando', () => {
    mockReq = {
      body: {
        author: 'Autor Teste',
        tags: ['teste'],
        userId: 'c123456789012345678901234'
        // phrase está faltando
      }
    };

    validate(createPhraseSchema)(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Dados inválidos',
      code: 'VALIDATION_ERROR',
      details: expect.arrayContaining([
        {
          field: 'phrase',
          message: 'Invalid input: expected string, received undefined'
        }
      ])
    });
  });

  test('deve retornar erro 400 quando userId é inválido', () => {
    mockReq = {
      body: {
        phrase: 'Frase válida com pelo menos 5 caracteres',
        author: 'Autor Teste',
        tags: ['teste'],
        userId: 'user123' // userId inválido (não é CUID)
      }
    };

    validate(createPhraseSchema)(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Dados inválidos',
      code: 'VALIDATION_ERROR',
      details: expect.arrayContaining([
        {
          field: 'userId',
          message: 'ID do usuário deve ser um CUID válido'
        }
      ])
    });
  });

  test('deve retornar erro 400 quando author está faltando', () => {
    mockReq = {
      body: {
        phrase: 'Frase válida com pelo menos 5 caracteres',
        tags: ['teste'],
        userId: 'c123456789012345678901234'
        // author está faltando
      }
    };

    validate(createPhraseSchema)(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Dados inválidos',
      code: 'VALIDATION_ERROR',
      details: expect.arrayContaining([
        {
          field: 'author',
          message: 'Invalid input: expected string, received undefined'
        }
      ])
    });
  });

  test('deve retornar erro 400 quando phrase é muito curta', () => {
    mockReq = {
      body: {
        phrase: 'Oi', // Muito curta (menos de 5 caracteres)
        author: 'Autor Teste',
        tags: ['teste'],
        userId: 'c123456789012345678901234'
      }
    };

    validate(createPhraseSchema)(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: 'Dados inválidos',
      code: 'VALIDATION_ERROR',
      details: expect.arrayContaining([
        {
          field: 'phrase',
          message: 'Frase deve ter pelo menos 5 caracteres'
        }
      ])
    });
  });
}); 