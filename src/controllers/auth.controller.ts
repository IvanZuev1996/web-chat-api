import { Response, Request, NextFunction } from 'express';
import db from '../db/db';
import { StatusCodes } from 'http-status-codes';

interface AuthByUsernameBodyProps {
    name: string;
}

export const authByUsername = async (
    req: Request<{}, {}, AuthByUsernameBodyProps>,
    res: Response,
    next: NextFunction
) => {
    const { name } = req.body;

    try {
        const query = 'SELECT * FROM person WHERE name = $1 LIMIT 1';
        const { rows } = await db.query(query, [name]);

        if (!rows?.length) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: 'Такого пользователя не существует'
            });
        }

        const userFromDb = rows[0];

        return res.status(StatusCodes.OK).json(userFromDb);
    } catch (error) {
        return next(error);
    }
};
