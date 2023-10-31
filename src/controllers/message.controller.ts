import { Response, Request } from 'express';
import db from '../db/db';

export const createMessage = async (req: Request, res: Response) => {
    const { text, person_id } = req.body;

    const newMessage = await db.query(
        'INSERT INTO message (text, person_id) values ($1, $2) RETURNING *',
        [text, person_id]
    );

    return res.status(200).json(newMessage.rows[0]);
};

export const getMessages = async (req: Request, res: Response) => {
    const queryResult = await db.query('SELECT * FROM message');
    const messages = queryResult.rows;
    return res.status(200).json(messages);
};

export const deleteMessageById = async (req: Request, res: Response) => {
    const id = req.params.id;
    await db.query('DELETE FROM message where id = $1', [id]);
    return res.status(200);
};
