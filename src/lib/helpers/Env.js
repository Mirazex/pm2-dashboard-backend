import ApplicationError from './ApplicationError.js';

export default class Env {
    static _cache = new Map();

    static set(key, value) {
        this._cache.set(key, value);
    }

    static get(key, required = true) {
        if (this._cache.has(key)) {
            return this._cache.get(key);
        }

        const env = process.env[key];
        if (env) {
            this._cache.set(key, env);
            return this._cache.get(key);
        }

        if (required) {
            throw ApplicationError.EnvironmentNotFound(key);
        }
    }
}
