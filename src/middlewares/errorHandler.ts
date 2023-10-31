import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function errorHandler(err: Error, req: Request, res: Response) {
    console.error(err.stack);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Что-то пошло не так'
    });
}
