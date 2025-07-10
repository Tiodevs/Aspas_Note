import app from './app';
import { envs } from './config/env';

const PORT = envs.server.port;

// Inicializar o servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor Express rodando na porta ${PORT}`);
  console.log(`📝 Aspas Note Backend - Pronto para salvar frases famosas!`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
  console.log(`📚 Documentação: http://localhost:${PORT}/health`);
});


export default server; 