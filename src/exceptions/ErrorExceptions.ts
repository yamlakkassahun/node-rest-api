export class ErrorException extends Error {
    status: number;
    message: string;
    
    constructor(message: any, status: number,) {
        super(message);
        this.status = status;
        this.message = message;
    }
}