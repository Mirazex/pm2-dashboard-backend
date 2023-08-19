import Controller from '@/lib/core/Controller.js';
import CheckApp from '@/middlewares/CheckApp.js';
import CheckAuth from '@/middlewares/CheckAuth.js';

export default class FindOne extends Controller {
    path = '/apps/:appName';
    method = Controller.RequestMethod.GET;
    middlewares = [CheckAuth, CheckApp];

    async request(ctx) {
        return ctx.context.app;
    }
}
