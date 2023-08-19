import Controller from '@/lib/core/Controller.js';
import CheckApp from '@/middlewares/CheckApp.js';
import CheckAuth from '@/middlewares/CheckAuth.js';
import LogService from '@/services/LogService.js';

export default class GetLogs extends Controller {
    path = '/apps/:appName/logs';
    method = Controller.RequestMethod.GET;
    middlewares = [CheckAuth, CheckApp];

    logService = LogService;

    async request(ctx) {
        const app = ctx.context.app;

        let stdout = await this.logService.read(app.logs.output);
        let stderr = await this.logService.read(app.logs.error);

        if (Array.isArray(stdout.lines) && stdout.lines.length > 0) {
            stdout.lines = stdout.lines.map(log => {
                return this.logService.converter.toHtml(log);
            });
        }

        if (Array.isArray(stderr.lines) && stderr.lines.length > 0) {
            stderr.lines = stderr.lines.map(log => {
                return this.logService.converter.toHtml(log);
            });
        }

        return {
            stdout,
            stderr
        };
    }
}
