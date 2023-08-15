import ApplicationError from '@/core/ApplicationError';
import { Controller } from '@/core/Controller';
import { HttpContext } from '@/core/HttpContext';
import CheckAuth from '@/server/middlewares/CheckAuth';
import PMService from '@/server/services/PMService';

export default class Restart extends Controller {
    path = '/apps/:appName/restart';
    method = Controller.RequestMethod.POST;
    middlewares = [CheckAuth];

    pmService = PMService;

    public async request(ctx: HttpContext) {
        const appName = ctx.request.param('appName');

        if (!appName) {
            throw ApplicationError.RequiredAttributes();
        }

        try {
            const apps = await this.pmService.restart(appName);
            if (Array.isArray(apps) && apps.length > 0)
                return {
                    success: true,
                };

            return {
                success: false,
            };
        } catch (err) {
            return new ApplicationError(15, 500, `${err}`);
        }
    }
}
