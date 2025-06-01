import { Request, Response } from 'express';
import pool from '../db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getMessage, response } from "../utils/response";

const JWT_SECRET = 'supersecreto123';
const JWT_EXPIRES_IN = '1d';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    // if (!user) return res.status(401).json({ message: 'User not found' });

    const isValid = await bcrypt.compare(password, user.password);
    // if (!isValid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role_id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({ token });
  } catch (error) {
    response.serverError(res, { message: getMessage('user.deleteError') });
  }

};
