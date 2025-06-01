import { Router } from 'express';
import { login } from '../controllers/auth.controller';

const authRouter = Router();
// Rutas para el controlador de user
authRouter.post('/login', login);
export default authRouter;
