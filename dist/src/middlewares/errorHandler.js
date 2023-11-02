import { StatusCodes } from 'http-status-codes';
export function errorHandler(err, req, res, next) {
    console.error(err.stack);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: 'Что-то пошло не так'
    });
}
