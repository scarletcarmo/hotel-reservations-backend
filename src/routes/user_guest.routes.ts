import { Router } from 'express';
import {
    createGuest,
    deleteUser,
    getByAll,
    getById,
    update,
} from '../controllers/user_guest.controller';
import { verifyToken } from '../middlewares/verifyToken';

const userGuestRouter = Router();

userGuestRouter.use(verifyToken);

userGuestRouter.get('/', getByAll);
userGuestRouter.get('/:id', getById);
userGuestRouter.post('/create', createGuest);
userGuestRouter.put('/update/:id', update);
userGuestRouter.delete('/:id', deleteUser);

export default userGuestRouter;
