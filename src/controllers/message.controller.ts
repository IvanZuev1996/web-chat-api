import { Response, Request, NextFunction } from 'express';
import db from '../db/db';
import { StatusCodes } from 'http-status-codes';

interface CreateMessageBodyProps {
    text: string;
    person_id: number;
}

interface GetMessagesBodyProps {
    lastMessageId: number;
    limit: number;
}

interface DeleteMessageByIdParamsProps {
    id: string;
}

export const createMessage = async (
    req: Request<{}, {}, CreateMessageBodyProps>,
    res: Response,
    next: NextFunction
) => {
    const { text, person_id } = req.body;

    try {
        const query =
            'INSERT INTO message (text, person_id) values ($1, $2) RETURNING id';
        const queryResult = await db.query(query, [text, person_id]);
        const newMessage = queryResult.rows[0];

        return res.status(StatusCodes.OK).json(newMessage);
    } catch (error) {
        return next(error);
    }
};

export const getMessages = async (
    req: Request<{}, {}, {}, GetMessagesBodyProps>,
    res: Response,
    next: NextFunction
) => {
    const { lastMessageId, limit } = req.query;

    try {
        const maxIdQueryResult = await db.query('SELECT MAX(id) FROM message');
        const lastMessageIdFromDb = maxIdQueryResult.rows[0].max + 1;

        const query =
            'SELECT message.id, message.text, person.id AS person_id, person.name AS person_name ' +
            'FROM message JOIN person ON message.person_id = person.id ' +
            'WHERE message.id < $1 ' +
            'ORDER BY message.id DESC ' +
            `LIMIT ${limit}`;

        const queryResult = await db.query(query, [
            lastMessageId || lastMessageIdFromDb
        ]);

        const messages = queryResult.rows.reverse();

        return res.status(StatusCodes.OK).json(messages);
    } catch (error) {
        return next(error);
    }
};

export const deleteMessageById = async (
    req: Request<DeleteMessageByIdParamsProps>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        await db.query('DELETE FROM message where id = $1', [id]);

        return res.status(StatusCodes.OK).end();
    } catch (error) {
        return next(error);
    }
};
