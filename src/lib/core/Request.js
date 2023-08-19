import {get} from 'radash';

export default class Request {
    #body = {};
    #query = {};
    #params = {};
    #headers = {};
    #cookies = {};

    constructor(request) {
        this.#body = request.body;
        this.#query = request.query;
        this.#params = request.params;
        this.#cookies = request.cookies;
        this.#headers = request.headers;
    }

    all() {
        return {...this.#body, ...this.#query};
    }

    input(key, defaultValue) {
        if (!key) return this.#body;
        return get(this.#body, key, defaultValue || null);
    }

    params() {
        return this.#params;
    }

    query(key, defaultValue) {
        return get(this.#query, key, defaultValue || null);
    }

    queries() {
        return this.#query;
    }

    param(key, defaultValue) {
        return get(this.#params, key, defaultValue || null);
    }

    headers() {
        return this.#headers;
    }

    header(key, defaultValue) {
        key = key.toLowerCase();
        const headers = this.headers();

        if (key === 'referer' || key === 'referrer') {
            return headers.referrer || headers.referer || defaultValue;
        }

        return headers[key] || defaultValue;
    }
}
