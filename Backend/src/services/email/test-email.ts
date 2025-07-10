import { EmailService } from './email.service';

// Função para testar o envio de email
async function testarEmail() {
  const emailService = new EmailService();
  
  try {
    console.log('🔄 Testando envio de email...');
    
    const resultado = await emailService.enviarEmailBoasVindas(
      'Teste',
      'cpspefelipe@gmail.com' // Substitua pelo seu email
    );
    
    if (resultado.success) {
      console.log('✅ Email enviado com sucesso!');
      console.log('Mensagem:', resultado.message);
    } else {
      console.log('❌ Erro ao enviar email:');
      console.log('Mensagem:', resultado.message);
    }
  } catch (error) {
    console.error('❌ Erro inesperado:', error);
  }
}

// Executar o teste
testarEmail(); 