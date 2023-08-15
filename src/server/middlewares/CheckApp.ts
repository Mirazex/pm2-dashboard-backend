import ApplicationError from '@/core/ApplicationError';
import { HttpContext } from '@/core/HttpContext';
import { Middleware } from '@/core/Middleware';
import PMService from '../services/PMService';
import GitService from '../services/GitService';
import EnvService from '../services/EnvService';

export default class CheckApp extends Middleware {
    pmService = PMService;
    gitService = GitService;
    envService = EnvService;

    public async use(ctx: HttpContext) {
        const appName = ctx.request.param('appName');

        if (!appName) {
            throw ApplicationError.RequiredAttributes();
        }

        const app = (await this.pmService.describe(appName)) as any;
        if (!app) throw ApplicationError.NotFound();

        app.git_branch = await this.gitService.branch(app.pm2_env_cwd);
        app.git_commit = await this.gitService.commit(app.pm2_env_cwd);
        app.env_file = await this.envService.get(app.pm2_env_cwd, true);

        ctx.context.app = app;
    }
}
