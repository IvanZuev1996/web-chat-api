import { Response, Request } from 'express';
import db from '../db/db';

export const createUser = async (req: Request, res: Response) => {
    const { name } = req.body;

    const newUser = await db.query(
        'INSERT INTO person (name) values ($1) RETURNING *',
        [name]
    );

    res.status(200).json(newUser.rows[0]);
};

export const getUsers = async (req: Request, res: Response) => {
    const users = await db.query('SELECT * FROM person');
    res.json(users.rows);
};
