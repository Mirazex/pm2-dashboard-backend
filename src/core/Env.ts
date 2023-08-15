import ApplicationError from '@/core/ApplicationError';

export default class Env {
    private static _cache = new Map();

    static set(key: string, value: string) {
        this._cache.set(key, value);
    }

    static get(key: string, required = true) {
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
