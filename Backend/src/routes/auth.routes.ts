import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { validate } from '../middlewares/validation.middleware';
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from '../schemas/auth.schemas';

const router = Router();
const authController = new AuthController();

// Rota para autenticação (login)
router.post('/login', validate(loginSchema), authController.login);

// Rota para criar um novo usuário (registro) - pública
router.post('/registro', validate(registerSchema), authController.register);

// Rotas para recuperação de senha - públicas
router.post('/forgot-password', validate(forgotPasswordSchema), authController.forgotPassword);

// Rota para redefinir senha
router.post('/reset-password', validate(resetPasswordSchema), authController.resetPassword);

export default router; 