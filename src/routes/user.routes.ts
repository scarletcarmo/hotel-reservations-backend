import { Router } from 'express';
import { getByAll, getById, create, update, deleteUser } from "../controllers/user.controller";

const userRouter = Router();
// Rutas para el controlador de user
userRouter.get('/', getByAll);
userRouter.get('/:id', getById);
userRouter.post('/', create);
userRouter.put('/:id', update);
userRouter.delete('/:id', deleteUser);

export default userRouter;
