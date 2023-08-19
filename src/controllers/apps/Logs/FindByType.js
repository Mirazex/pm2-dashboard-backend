import ApplicationError from '@/lib/helpers/ApplicationError.js';
import Controller from '@/lib/core/Controller.js';
import CheckApp from '@/middlewares/CheckApp.js';
import CheckAuth from '@/middlewares/CheckAuth.js';
import LogService from '@/services/LogService.js';

export default class FinaByType extends Controller {
    path = '/apps/:appName/logs/:logType';
    method = Controller.RequestMethod.GET;
    middlewares = [CheckAuth, CheckApp];

    logService = LogService;

    async request(ctx) {
        const app = ctx.context.app;

        const logType = ctx.request.param('logType');
        const lineCount = ctx.request.query('lineCount') || 100;
        const nextKey = ctx.request.query('nextKey') || 0;

        if (!['stdout', "stderr"].includes(logType)) {
            throw ApplicationError.NotFound();
        }

        const filePath = logType === 'stdout' ? app.pm_out_log_path : app.pm_err_log_path;
        let logs = await this.logService.read(filePath, nextKey, lineCount);

        if (Array.isArray(logs.lines) && logs.lines.length > 0) {
            logs.lines = logs.lines.map(log => {
                return this.logService.converter.toHtml(log);
            });
        }


        return logs;
    }
}
