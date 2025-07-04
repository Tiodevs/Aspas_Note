import { Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
    error: `A rota ${req.method} ${req.originalUrl} não existe neste servidor.`
  });
}; 