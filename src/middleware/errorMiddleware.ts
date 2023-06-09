import { NextFunction, Request, Response } from 'express';
import { ErrorException } from '../exceptions/ErrorExceptions';

export const GlobalErrorHandler = async (error: ErrorException, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    let message = error.message || 'Woops! Something went wrong';

    response
        .status(status)
        .send({
            status,
            message,
        })
}