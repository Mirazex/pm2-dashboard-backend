import ApplicationError from '@/core/ApplicationError';
import { Controller } from '@/core/Controller';
import { HttpContext } from '@/core/HttpContext';
import CheckApp from '@/server/middlewares/CheckApp';
import CheckAuth from '@/server/middlewares/CheckAuth';
import LogService from '@/server/services/LogService';

export default class FinaByType extends Controller {
    path = '/apps/:appName/logs/:logType';
    method = Controller.RequestMethod.GET;
    middlewares = [CheckAuth, CheckApp];

    logService = LogService

    public async request(ctx: HttpContext) {
        const app = ctx.context.app;

        const logType = ctx.request.param('logType');
        const lineCount = ctx.request.query('lineCount') || 100;
        const nextKey = ctx.request.query('nextKey') || 0;

        if (!['stdout', "stderr"].includes(logType)) {
            throw ApplicationError.NotFound()
        }

        const filePath = logType === 'stdout' ? app.pm_out_log_path: app.pm_err_log_path
        let logs = await this.logService.read(filePath, nextKey, lineCount)

        if (Array.isArray(logs.lines) && logs.lines.length > 0) {
            logs.lines = logs.lines.map(log => {
                return this.logService.converter.toHtml(log)
            })
        }


        return logs
    }
}
