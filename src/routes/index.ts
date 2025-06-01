import { Router } from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';

const router = Router();
// Prefijo para las rutas de user
router.use('/users', userRouter);  
router.use('/auth', authRouter);  
// Prefijo para las rutas de reservations
// Prefijo para las rutas de guest

export default router;
