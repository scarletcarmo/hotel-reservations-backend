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

