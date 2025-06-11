import { Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { create, deleteReservation, getByAll, getById, update } from '../controllers/reservations.controller';

const reservationsRouter = Router();

reservationsRouter.use(verifyToken);

reservationsRouter.get('/', getByAll);
reservationsRouter.get('/:id', getById);
reservationsRouter.post('/create', create);
reservationsRouter.put('/update/:id', update);
reservationsRouter.delete('/:id', deleteReservation);

export default reservationsRouter;
