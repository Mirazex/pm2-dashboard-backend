import ApplicationError from '@/lib/helpers/ApplicationError.js';
import Controller from '@/lib/core/Controller.js';
import CheckApp from '@/middlewares/CheckApp.js';
import CheckAuth from '@/middlewares/CheckAuth.js';
import LogService from '@/services/LogService.js';

export default class GetLogs extends Controller {
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

        const filePath = logType === 'stdout' ? app.logs.output : app.logs.error;
        const logs = await this.logService.read(filePath, nextKey, lineCount);

        if (Array.isArray(logs.lines) && logs.lines.length > 0) {
            logs.lines = logs.lines.map(log => {
                return this.logService.converter.toHtml(log);
            });
        }


        return logs;
    }
}
