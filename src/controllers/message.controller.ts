import { Response, Request } from 'express';
import db from '../db/db';

export const createMessage = async (req: Request, res: Response) => {
    const { text, userId } = req.body;

    const newMessage = await db.query(
        'INSERT INTO message (text, person_id) values ($1, $2) RETURNING *',
        [text, userId]
    );

    res.status(200).json(newMessage.rows[0]);
};

export const getMessages = async (req: Request, res: Response) => {
    const messages = await db.query('SELECT * FROM message');
    res.json(messages.rows);
};

export const deleteMessageById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const message = await db.query('DELETE FROM message where id = $1', [id]);
    res.json(message.rows[0]);
};
