import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken";
import {getAll, getByID,saveRoom,updateRoom,deleteRoom} from "../controllers/room.controller"

const roomRouter= Router();

roomRouter.use(verifyToken);

roomRouter.get('/', getAll);
roomRouter.get('/:id', getByID);
roomRouter.post('/', saveRoom);
roomRouter.put('/:id', updateRoom);
roomRouter.delete('/:id', deleteRoom);

export default roomRouter;