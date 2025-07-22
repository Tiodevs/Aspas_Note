import { PhrasesService } from '../services/phrases/phrases.service';

// Mock do Prisma - simula o banco de dados
jest.mock('../prisma/client', () => ({
  __esModule: true,
  default: {
    phrase: {
      create: jest.fn(),
    },
  },
}));

// Importar o prisma mockado
import mockPrisma from '../prisma/client';
const mockCreate = (mockPrisma as any).phrase.create;

describe('PhrasesService', () => {
  let phrasesService: PhrasesService;

  beforeEach(() => {
    phrasesService = new PhrasesService();
    // Limpa o mock antes de cada teste
    jest.clearAllMocks();
  });

  test('deve criar uma instância do PhrasesService', () => {
    expect(phrasesService).toBeInstanceOf(PhrasesService);
  });

  test('deve ter o método createPhrase', () => {
    expect(typeof phrasesService.createPhrase).toBe('function');
  });

  // 🟢 TESTE DE SUCESSO
  test('deve criar uma frase com sucesso', async () => {
    // Dados que vamos enviar para a função
    const dadosEntrada = {
      phrase: 'A vida é bela',
      author: 'Roberto Benigni',
      tags: ['vida', 'cinema'],
      userId: 'user123'
    };

    // O que o banco "retornaria" (mockado)
    const respostaMockada = {
      id: 'phrase456',
      phrase: 'A vida é bela',
      author: 'Roberto Benigni',
      tags: ['vida', 'cinema'],
      userId: 'user123',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    };

    // Configurar o que o mock deve retornar
    mockCreate.mockResolvedValue(respostaMockada);

    // Executar a função que vamos testar
    const resultado = await phrasesService.createPhrase(
      dadosEntrada.phrase,
      dadosEntrada.author,
      dadosEntrada.tags,
      dadosEntrada.userId
    );

    // Verificações:
    // 1. A função retornou o resultado esperado?
    expect(resultado).toEqual(respostaMockada);
    
    // 2. O Prisma foi chamado corretamente?
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        phrase: 'A vida é bela',
        author: 'Roberto Benigni',
        tags: ['vida', 'cinema'],
        userId: 'user123'
      }
    });
    
    // 3. O Prisma foi chamado apenas uma vez?
    expect(mockCreate).toHaveBeenCalledTimes(1);
  });

  // 🔴 TESTES DE ERRO
  test('deve falhar quando o banco de dados retorna erro', async () => {
    // Simular erro do banco
    const erroSimulado = new Error('Erro de conexão com banco');
    mockCreate.mockRejectedValue(erroSimulado);

    // Tentar criar frase e esperar que dê erro
    await expect(
      phrasesService.createPhrase('frase', 'autor', ['tag'], 'user123')
    ).rejects.toThrow('Erro de conexão com banco');
  });

  // 🟡 TESTES COM DADOS DIFERENTES
  test('deve criar frase sem tags (array vazio)', async () => {
    const respostaMockada = {
      id: 'phrase789',
      phrase: 'Frase sem tags',
      author: 'Autor Desconhecido',
      tags: [], // Array vazio
      userId: 'user456',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockCreate.mockResolvedValue(respostaMockada);

    const resultado = await phrasesService.createPhrase(
      'Frase sem tags',
      'Autor Desconhecido',
      [], // Tags vazias
      'user456'
    );

    expect(resultado.tags).toEqual([]);
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        phrase: 'Frase sem tags',
        author: 'Autor Desconhecido',
        tags: [],
        userId: 'user456'
      }
    });
  });

  test('deve criar frase com múltiplas tags', async () => {
    const muitasTags = ['motivação', 'vida', 'sucesso', 'felicidade', 'amor'];
    const respostaMockada = {
      id: 'phrase999',
      phrase: 'Frase com muitas tags',
      author: 'Filósofo',
      tags: muitasTags,
      userId: 'user789',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockCreate.mockResolvedValue(respostaMockada);

    const resultado = await phrasesService.createPhrase(
      'Frase com muitas tags',
      'Filósofo',
      muitasTags,
      'user789'
    );

    expect(resultado.tags).toHaveLength(5);
    expect(resultado.tags).toContain('motivação');
    expect(resultado.tags).toContain('amor');
  });

  // 🎯 TESTES DE EDGE CASES
  test('deve funcionar com caracteres especiais', async () => {
    const fraseComEmojis = 'A vida é 🌟 incrível! ✨';
    const autorComAcentos = 'José Antônio da Côrte';
    const tagsEspeciais = ['emojis-🎉', 'acentuação-ção'];

    const respostaMockada = {
      id: 'phrase-especial',
      phrase: fraseComEmojis,
      author: autorComAcentos,
      tags: tagsEspeciais,
      userId: 'user-especial',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockCreate.mockResolvedValue(respostaMockada);

    const resultado = await phrasesService.createPhrase(
      fraseComEmojis,
      autorComAcentos,
      tagsEspeciais,
      'user-especial'
    );

    expect(resultado.phrase).toContain('🌟');
    expect(resultado.author).toContain('Antônio');
    expect(resultado.tags[0]).toContain('🎉');
  });


  test('deve funcionar com strings muito pequenas', async () => {
    const respostaMockada = {
      id: 'phrase-min',
      phrase: 'A',
      author: 'B',
      tags: ['c'],
      userId: 'u',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockCreate.mockResolvedValue(respostaMockada);

    const resultado = await phrasesService.createPhrase('A', 'B', ['c'], 'u');

    expect(resultado.phrase).toBe('A');
    expect(resultado.author).toBe('B');
    expect(resultado.tags[0]).toBe('c');
  });
}); 