import { Response, Request } from 'express';
import db from '../db/db';

export const authByUsername = async (req: Request, res: Response) => {
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

    return res.status(200).json(rows[0]);
};
