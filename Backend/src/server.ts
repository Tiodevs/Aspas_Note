import app from './app';

const PORT = process.env.PORT || 4000;

// Inicializar o servidor
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor Express rodando na porta ${PORT}`);
  console.log(`📝 Aspas Note Backend - Pronto para salvar frases famosas!`);
  console.log(`🌐 Acesse: http://localhost:${PORT}`);
  console.log(`📚 Documentação: http://localhost:${PORT}/health`);
});


export default server; 