import { Router } from 'express';
import userRouter from './user.routes';
import authRouter from './auth.routes';
import userGuestRouter from './user_guest.routes';

import reservationsRouter from './reservations.routes';

import roomRouter from './room.routes';


const router = Router();
//user
router.use('/users', userRouter); 
//auth 
router.use('/auth', authRouter);  
//guest
router.use('/guests', userGuestRouter);  

//reservations
router.use('/reservations', reservationsRouter);  
//room
router.use('/rooms',roomRouter)


export default router;
