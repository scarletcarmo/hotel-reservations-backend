import { Router } from 'express';
import { getByAll, getById, create, update, deleteUser } from "../controllers/user.controller";
import { verifyToken } from '../middlewares/verifyToken';

const userRouter = Router();
// Rutas para el controlador de user

userRouter.get('/', verifyToken ,getByAll);
userRouter.get('/', verifyToken ,getByAll);
userRouter.get('/', verifyToken ,getByAll);
userRouter.get('/:id',verifyToken ,getById);
userRouter.post('/',verifyToken, create);
userRouter.put('/:id', verifyToken,update);
userRouter.delete('/:id', verifyToken,deleteUser);

export default userRouter;
