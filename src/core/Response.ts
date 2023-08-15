import { Response as ExpressResponse } from "express";

export class Response {
    constructor(private _response: ExpressResponse<any, Record<string, any>>) {
        this._response = _response
    }

    setCookie(name: any, value: any, options: any) {
        this._response.cookie(name, value, options);
    }

    clearCookie(name: any) {
        this._response.clearCookie(name);
    }
}
