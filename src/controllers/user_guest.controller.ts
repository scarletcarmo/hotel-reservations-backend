import { Request, Response } from "express";
import { getMessage, response } from "../utils/response";
import pool from "../db";
import { UserGuest } from "../models/user_guest.model";

export const getByAll = async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM guest');
        response.ok(res, { message: getMessage('user.fetchSuccess'), data: result.rows });
    } catch (error) {
        response.notFound(res, 'user.notFound');
    }
}

export const getById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM guest WHERE id = $1', [id]);
        response.ok(res, { message: getMessage('user.fetchByOneSuccess'), data: result.rows[0] });

    } catch (error) {
        response.serverError(res, error, 'Error al obtener usuario');
    }
};

export const createGuest = async (req: Request, res: Response) => {
    console.log("➡️ Entrando al controlador create()");
    try {
        const {
            name,
            last_name,
            identification,
            phone
        } = req.body as UserGuest;
        console.log("req.body", req.body);

        const result = await pool.query(
            'INSERT INTO guest (name, last_name, identification, phone) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, last_name, identification, phone]
        );
        console.log("result", result.rows[0]);

        response.created(res, { message: getMessage('user.create'), data: result.rows[0] });
    } catch (error) {
        response.serverError(res, { message: getMessage('user.createError') });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            name,
            last_name,
            identification,
            phone
        } = req.body as UserGuest;
        const result = await pool.query(
            'UPDATE guest SET name=$1, last_name=$2, identification=$3, phone=$4 WHERE id=$5 RETURNING *',
            [name, last_name, identification, phone, id]
        );
        response.created(res, { message: getMessage('user.update'), data: result.rows[0] });
    } catch (error) {
        response.created(res, { message: getMessage('user.updateError') });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM guest WHERE id=$1', [id]);
        //response.noContent(res);
        response.ok(res, { message: getMessage('user.delete') });
    } catch (error) {
        response.serverError(res, { message: getMessage('user.deleteError') });
    }
};
