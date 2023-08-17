import { Controller } from '@/core/Controller';
import { HttpContext } from '@/core/HttpContext';
import CheckApp from '@/server/middlewares/CheckApp';
import CheckAuth from '@/server/middlewares/CheckAuth';
import LogService from '@/server/services/LogService';

export default class FinaMany extends Controller {
    path = '/apps/:appName/logs';
    method = Controller.RequestMethod.GET;
    middlewares = [CheckAuth, CheckApp];

    logService = LogService

    public async request(ctx: HttpContext) {
        const app = ctx.context.app;

        let stdout = await this.logService.read(app.pm_out_log_path)
        let stderr = await this.logService.read(app.pm_out_log_path)

        if (Array.isArray(stdout.lines) && stdout.lines.length > 0) {
            stdout.lines = stdout.lines.map(log => {
                return this.logService.converter.toHtml(log)
            })
        }

        if (Array.isArray(stderr.lines) && stderr.lines.length > 0) {
            stderr.lines = stderr.lines.map(log => {
                return this.logService.converter.toHtml(log)
            })
        }

        return {
            stdout,
            stderr
        }
    }
}
