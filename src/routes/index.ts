import { Router } from 'express';
import userRouter from './user.routes';

const router = Router();
// Prefijo para las rutas de user
router.use('/', userRouter);  // Las rutas de TODO list estarán bajo "/api/todos"
// Prefijo para las rutas de reservations
// Prefijo para las rutas de guest

export default router;
