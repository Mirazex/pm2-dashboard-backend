import ApplicationError from '@/lib/helpers/ApplicationError.js';
import Controller from '@/lib/core/Controller.js';
import CheckAuth from '@/middlewares/CheckAuth.js';
import PMService from '@/services/PMService.js';

export default class Reload extends Controller {
    path = '/apps/:appName/reload';
    method = Controller.RequestMethod.POST;
    middlewares = [CheckAuth];

    pmService = PMService;

    async request(ctx) {
        const appName = ctx.request.param('appName');

        if (!appName) {
            throw ApplicationError.RequiredAttributes();
        }

        try {
            const apps = await this.pmService.reload(appName);
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
