import { Controller } from '@/core/Controller';
import { HttpContext } from '@/core/HttpContext';
import CheckApp from '@/server/middlewares/CheckApp';
import CheckAuth from '@/server/middlewares/CheckAuth';

export default class FindOne extends Controller {
    path = '/apps/:appName';
    method = Controller.RequestMethod.GET;
    middlewares = [CheckAuth, CheckApp];

    public async request(ctx: HttpContext) {
        return ctx.context.app;
    }
}
