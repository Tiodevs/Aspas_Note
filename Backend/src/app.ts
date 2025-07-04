import express from 'express';
import cors from 'cors';

// Rotas
import routes from './routes/routes';

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Middleware para CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : '*',
  credentials: true
}));

// Rota principal
app.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo ao backend da Aspas Note!',
    version: '1.0.0',
    description: 'API para gerenciar frases de famosos',
    endpoints: {
      quotes: '/api/quotes',
      authors: '/api/profile'
    }
  });
});


// Registrar as rotas
app.use('/api', routes);


export default app; 