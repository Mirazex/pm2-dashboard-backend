import ApplicationError from '@/lib/helpers/ApplicationError.js';

export default class Middleware {
    use(ctx) {
        throw ApplicationError.MethodNotImplemented('use');
    }

    static async register(ctx) {
        const middleware = new this();
        await middleware.use(ctx);
    }
}
