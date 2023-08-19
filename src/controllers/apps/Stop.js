import CheckAuth from '@/middlewares/CheckAuth.js';
import PMService from '@/services/PMService.js';
import Controller from "@/lib/core/Controller.js";
import ApplicationError from "@/lib/helpers/ApplicationError.js";

export default class Stop extends Controller {
    path = '/apps/:appName/stop';
    method = Controller.RequestMethod.POST;
    middlewares = [CheckAuth];

    pmService = PMService;

    async request(ctx) {
        const appName = ctx.request.param('appName');

        if (!appName) {
            throw ApplicationError.RequiredAttributes();
        }

        try {
            const apps = await this.pmService.stop(appName);
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
