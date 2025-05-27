import { Request,Response } from "express";
import pool from "../db";
import { User } from "../models/user.model";

export const getUsers = async (_req: Request, res:Response)=>{
    const result = await pool.query('Select * from users');
    res.json(result.rows)
}

export const getUserById = async(_req:Request, res:Response)=>{
const {id} = _req.params;
const result = await pool.query('Select * from users where id = $1', [id]);
res.json(result.rows[0]);

}

export const createUser =async (_req: Request, res: Response) => {
    const{username, password, email, role_id} =_req.body as User;
    const result = await pool.query('Insert into users (username, password, email, role_id) values ($1 , $2, $3, $4) RETURNING *', 
        [username, password, email,role_id]
     );

     res.status(201).json(result.rows[0]);
}


export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, password, email, role_id } = req.body as User;
  const result = await pool.query(
    'UPDATE users SET username=$1, password=$2, email=$3, role_id=$4 WHERE id=$5 RETURNING *',
    [username, password, email, role_id, id]
  );
  res.json(result.rows[0]);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query('DELETE FROM users WHERE id=$1', [id]);
  res.status(204).send();
};