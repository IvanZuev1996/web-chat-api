import { Response, Request } from 'express';
import db from '../db/db';

export const createUser = async (req: Request, res: Response) => {
    const { name } = req.body;

    const query = {
        text: 'SELECT * FROM person WHERE name = $1',
        values: [name]
    };
    const { rows } = await db.query(query);

    if (rows.length <= 0) {
        return res.status(409).json({
            error: 'Такого пользователя не существует'
        });
    }

    const newUser = await db.query(
        'INSERT INTO person (name) values ($1) RETURNING *',
        [name]
    );

    return res.status(200).json(newUser.rows[0]);
};

export const getUsers = async (req: Request, res: Response) => {
    const users = await db.query('SELECT * FROM person');
    res.json(users.rows);
};

export const deleteUserById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const message = await db.query('DELETE FROM person where id = $1', [id]);
    res.json(message.rows[0]);
};
