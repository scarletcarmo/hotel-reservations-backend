import { Request, Response } from "express";
import pool from "../db";
import { getMessage, response } from "../utils/response";
import { Reservations } from "../models/reservations.model";

export const getByAll = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM reservation');
        response.ok(res, { message: getMessage('reservation.fetchSuccess'), data: result.rows });
    } catch (error) {
        response.notFound(res, 'reservation.notFound');
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM reservation WHERE id = $1', [id]);
        response.ok(res, { message: getMessage('reservation.fetchByOneSuccess'), data: result.rows[0] });

    } catch (error) {
        response.serverError(res, error, 'Error al obtener usuario');
    }
};

export const getByUser = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const result = await pool.query(`
            SELECT r.check_in, r.check_out, u.name, u.last_name, u.identification
            FROM reservation AS r
            JOIN users AS u ON r.guest_id = u.id
            WHERE u.id = $1
            `, [user_id]);
        response.ok(res, { message: getMessage('reservation.fetchByOneSuccess'), data: result.rows[0] });
    } catch (error) {
        response.serverError(res, error, 'Error al obtener usuario');
    }
}
//GET /reservations/room/:roomId
export const getByRooms = async (req: Request, res: Response) => {
    try {
        const { rooms_id } = req.params;
        const result = await pool.query(`
            SELECT r.check_in, r.check_out, u.name, u.last_name, u.identification
            FROM reservation AS r
            JOIN rooms rm u ON r.rooms_id = rm.id
            WHERE rm.id = $1
            `, [rooms_id]);
        response.ok(res, { message: getMessage('reservation.fetchByOneSuccess'), data: result.rows[0] });
    } catch (error) {
        response.serverError(res, error, 'Error al obtener usuario');
    }
}

export const getByAvailability = async (req: Request, res: Response) => {
    //GET /reservations/availability?roomId=1&check_in=2025-06-15&check_out=2025-06-20
}

export const create = async (req: Request, res: Response) => {
    try {
        console.log("Body recibido:", req.body);
        const {
            check_in,
            check_out,
            status,
            guest_id,
            room_id
        } = req.body;
        const result = await pool.query(
            'INSERT INTO reservation (check_in, check_out, status, guest_id, room_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [check_in, check_out, status, guest_id, room_id]
        );
        response.created(res, { message: getMessage('reservation.create'), data: result.rows[0] });
    } catch (error) {
        response.serverError(res, { message: getMessage('reservation.createError') });
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            check_in,
            check_out,
            status,
            guest_id,
            room_id
        } = req.body as Reservations;

        const result = await pool.query(
            'UPDATE reservation SET check_in=$1, check_out=$2, status=$3, guest_id=$4, room_id=$5 WHERE id=$6 RETURNING *',
            [check_in, check_out, status, guest_id, room_id, id]
        );
        response.created(res, { message: getMessage('reservation.update'), data: result.rows[0] });
    } catch (error) {
        response.created(res, { message: getMessage('reservation.updateError') });
    }
};

export const deleteReservation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM reservation WHERE id=$1', [id]);
        //response.noContent(res);
        response.ok(res, { message: getMessage('reservation.delete') });
    } catch (error) {
        response.serverError(res, { message: getMessage('reservation.deleteError') });
    }
};

export const cancelReservation = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const query = `UPDATE reservation SET status = 'cancelled' WHERE id=$1 RETURNING *`;
        const result = await pool.query(query, [id]);
                //response.noContent(res);
        response.ok(res, { message: getMessage('reservation.delete') });
    } catch (error) {
        response.serverError(res, { message: getMessage('reservation.deleteError') });
    }
};

