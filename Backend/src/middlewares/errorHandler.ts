import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Erro no servidor:', error);

  // Erro de validação
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      error: error.message
    });
  }

  // Erro de recurso não encontrado
  if (error.name === 'NotFoundError') {
    return res.status(404).json({
      success: false,
      message: 'Recurso não encontrado',
      error: error.message
    });
  }

  // Erro padrão do servidor
  return res.status(500).json({
    success: false,
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Algo deu errado'
  });
}; 