import { Response, Request } from 'express';
import db from '../db/db';
import { StatusCodes } from 'http-status-codes';

export const createUser = async (
    req: Request,
    res: Response,
    next: (err?: any) => void
) => {
    const { name } = req.body;
    try {
        const findPersonQuery = 'SELECT * FROM person WHERE name = $1 LIMIT 1';
        const { rows } = await db.query(findPersonQuery, [name]);

        if (rows?.length) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error: 'Такого пользователь уже существует'
            });
        }

        const insertPersonQuery =
            'INSERT INTO person (name) values ($1) RETURNING id';
        const queryResult = await db.query(insertPersonQuery, [name]);
        const newUser = queryResult.rows[0];

        return res.status(StatusCodes.OK).json(newUser);
    } catch (error) {
        return next(error);
    }
};

export const getUsers = async (
    req: Request,
    res: Response,
    next: (err?: any) => void
) => {
    try {
        const queryResult = await db.query('SELECT * FROM person');
        const users = queryResult.rows;

        return res.status(StatusCodes.OK).json(users);
    } catch (error) {
        return next(error);
    }
};

export const deleteUserById = async (
    req: Request,
    res: Response,
    next: (err?: any) => void
) => {
    try {
        const id = req.params.id;
        await db.query('DELETE FROM person where id = $1', [id]);

        return res.status(StatusCodes.OK).end();
    } catch (error) {
        return next(error);
    }
};
