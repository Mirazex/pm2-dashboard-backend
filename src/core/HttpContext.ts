import { NextFunction } from 'express';
import { Request } from './Request';
import { Response } from './Response';

type TContext = {
    accessToken: string | null;
} & Record<string, any>;

export class HttpContext {
    request: Request;
    response: Response;
    next: NextFunction;
    context: TContext;

    constructor(request: Request, response: Response, next: NextFunction) {
        this.request = request;
        this.response = response;
        this.next = next;
        this.context = {
            accessToken: null,
        };
    }
}
