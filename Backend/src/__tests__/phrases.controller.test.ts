import { Request, Response } from 'express';

const mockCreatePhrase = jest.fn();

// Importar controller DEPOIS do mock
import { PhrasesController } from '../controllers/phrases.controller';

jest.mock('../services/phrases/phrases.service', () => {
  return {
    PhrasesService: jest.fn().mockImplementation(() => {
      return {
        createPhrase: mockCreatePhrase
      };
    })
  };
});


describe('PhrasesController', () => {
  let phrasesController: PhrasesController;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    // Limpar todos os mocks
    jest.clearAllMocks();
    
    phrasesController = new PhrasesController();
    
    // Mock da resposta HTTP
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    
    mockRes = {
      status: mockStatus,
      json: mockJson,
    };
  });


  test('deve retornar 201 quando frase é criada com sucesso', async () => {
    // Dados que chegam na requisição
    mockReq = {
      body: {
        phrase: 'Teste de frase',
        author: 'Autor Teste',
        tags: ['teste'],
        userId: 'user123'
      }
    };

    // O que o service vai retornar
    const fraseRetornada = {
      id: 'phrase-created',
      phrase: 'Teste de frase',
      author: 'Autor Teste',
      tags: ['teste'],
      userId: 'user123',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockCreatePhrase.mockResolvedValue(fraseRetornada);

    // Executar o controller
    await phrasesController.createPhrase(mockReq as Request, mockRes as Response);

    // Verificações HTTP
    expect(mockStatus).toHaveBeenCalledWith(201); // Status 201 Created
    expect(mockJson).toHaveBeenCalledWith(fraseRetornada); // Retorna a frase criada
    expect(mockCreatePhrase).toHaveBeenCalledWith(
      'Teste de frase',
      'Autor Teste', 
      ['teste'],
      'user123'
    );
  });


  test('deve funcionar sem tags (undefined)', async () => {
    mockReq = {
      body: {
        phrase: 'Frase sem tags',
        author: 'Autor',
        userId: 'user123'
      }
    };

    const fraseRetornada = {
      id: 'phrase-no-tags',
      phrase: 'Frase sem tags',
      author: 'Autor',
      tags: undefined,
      userId: 'user123',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockCreatePhrase.mockResolvedValue(fraseRetornada);

    await phrasesController.createPhrase(mockReq as Request, mockRes as Response);

    // Verificar que o service foi chamado com array vazio para tags
    expect(mockCreatePhrase).toHaveBeenCalledWith(
      'Frase sem tags',
      'Autor',
      undefined,
      'user123'
    );
    expect(mockStatus).toHaveBeenCalledWith(201);
  });
}); 