import pool from "../db";
import { Response, Request } from "express";
import { Room } from "../models/room.model";
import { getMessage, response } from "../utils/response";








export const getAll = async (req: Request, res: Response) => {

    try {
        const result = await pool.query('select * from  rooms');
        response.ok(res, { message: getMessage('room.fetchSuccess'), data: result.rows });


    } catch (error) {
     response.serverError(res, { message: getMessage('room.Not_fetchSuccess'), data: null }); 
    }
}

export const getByID = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const result = await pool.query('select * from  rooms where id=$1',[id]);
        response.ok(res, { message: getMessage('room.fetchSuccess'), data: result.rows[0] });

        if (!result) {
            response.notFound(res); 
        }
    } catch (error) {
     response.serverError(res, { message: getMessage('room.Not_fetchSuccess'), data: null }); 
    }
}

export const saveRoom = async (req: Request, res: Response) => {

    const { room_number,type,price_per_night,status} = req.body as Room;

    try {

      const result = await pool.query('INSERT INTO rooms (room_number,type,price_per_night,status) values ($1,$2,$3,$4) RETURNING *',[room_number,type,price_per_night,status]);  
      
      response.ok(res,{message: getMessage('room.create'),data: result.rows[0] } );
    } catch (error) {

    }

}
export const updateRoom = async (req: Request, res: Response) => {

     const {id} = req.params;

    const { room_number,type,price_per_night,status} = req.body as Room;

    try {

      const result = await pool.query('UPDATE rooms SET room_number=$1,type=$2,price_per_night=$3,status=$4  WHERE  id=$5 RETURNING *',[room_number,type,price_per_night,status]);  
      
      response.ok(res,{message: getMessage('room.update'),data: result.rows[0] } );
    } catch (error) {

    }

}

export const deleteRoom = async (req: Request, res: Response) => {

     const {id} = req.params;

    

    try {

      const result = await pool.query('DELETE FROM rooms WHERE id=$1', [id]);  
      
      response.ok(res,{message: getMessage('room.delete'),data: result.rows[0] } );
    } catch (error) {

    }

}


