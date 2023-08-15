import { Request as ExpressRequest } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { get } from 'radash';

export class Request {
    public _body = {} as Record<string, any>;
    public _query = {} as Record<string, any>;
    public readonly _params = {} as Record<string, any>;
    public readonly _headers = {} as Record<string, any>;
    public readonly cookies = {} as Record<string, any>;

    constructor(request: ExpressRequest<ParamsDictionary, any, any, ParsedQs, Record<string, any>>) {
        this._body = request.body;
        this._query = request.query;
        this._params = request.params;
        this.cookies = request.cookies;
        this._headers = request.headers;
    }

    all() {
        return { ...this._body, ...this._query };
    }

    input(key?: string, defaultValue?: any) {
        if (!key) return this._body;
        return get(this._body, key, defaultValue || null);
    }

    qs(key: string) {
        if (!key) return this._query;
        return get(this._query, key, null);
    }

    params() {
        return this._params;
    }

    query(key: string, defaultValue?: any) {
        return get(this._query, key, defaultValue || null);
    }

    queries() {
        return this._query
    };

    param(key: string, defaultValue?: any) {
        return get(this._params, key, defaultValue || null);
    }

    headers() {
        return this._headers;
    }

    header(key: string, defaultValue?: any) {
        key = key.toLowerCase();
        const headers = this.headers();

        switch (key) {
            case 'referer':
            case 'referrer':
                return headers.referrer || headers.referer || defaultValue;
            default:
                return headers[key] || defaultValue;
        }
    }
}
