import { NextFunction, Request, Response } from 'express';

export class ErrorException extends Error {
    status: number;
    message: string;

    
    constructor(message: string, status: number,) {
        super(message);
        this.status = status;
        this.message = message;
    }
}