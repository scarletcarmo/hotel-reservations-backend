import { Router } from 'express';
import { getByAll, getById, create, update, deleteUser } from "../controllers/user.controller";
import { verifyToken } from '../middlewares/verifyToken';

const userRouter = Router();
// Rutas para el controlador de user
userRouter.use(verifyToken);

userRouter.get('/', getByAll);
userRouter.get('/', getByAll);
userRouter.get('/', getByAll);
userRouter.get('/:id', getById);
userRouter.post('/', create);
userRouter.put('/:id', update);
userRouter.delete('/:id', deleteUser);

export default userRouter;
