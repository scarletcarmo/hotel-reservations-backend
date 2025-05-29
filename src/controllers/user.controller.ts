import { Request, Response } from "express";
import pool from "../db";
import { User } from "../models/user.model";
import { getMessage, response } from "../utils/response";

export const getByAll = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM users');    
    response.ok(res, { message: getMessage('user.fetchSuccess'), data: result.rows });
  } catch (error) {
    response.notFound(res, 'user.notFound');
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    response.ok(res, { message: getMessage('user.fetchByOneSuccess'), data: result.rows[0] });

  } catch (error) {
    response.serverError(res, error, 'Error al obtener usuario');
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { username, password, email, role_id } = req.body as User;
    const result = await pool.query(
      'INSERT INTO users (username, password, email, role_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, password, email, role_id]
    );
    response.created(res, { message: getMessage('user.create'), data: result.rows[0] });
  } catch (error) {
    response.created(res, { message: getMessage('user.createError')});
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, password, email, role_id } = req.body as User;
    const result = await pool.query(
      'UPDATE users SET username=$1, password=$2, email=$3, role_id=$4 WHERE id=$5 RETURNING *',
      [username, password, email, role_id, id]
    );
    response.created(res, { message: getMessage('user.update'), data: result.rows[0] });
  } catch (error) {
    response.created(res, { message: getMessage('user.updateError')});
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM users WHERE id=$1', [id]);
    response.noContent(res);
    response.ok(res, { message: getMessage('user.delete')});
  } catch (error) {
    response.serverError(res, { message: getMessage('user.deleteError')});
  }
};
