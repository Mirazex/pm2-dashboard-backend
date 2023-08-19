import PMService from '../services/PMService.js';
import GitService from '../services/GitService.js';
import EnvService from '../services/EnvService.js';
import Middleware from "@/lib/core/Middleware.js";
import ApplicationError from "@/lib/helpers/ApplicationError.js";

export default class CheckApp extends Middleware {
    pmService = PMService;
    gitService = GitService;
    envService = EnvService;

    async use(ctx) {
        const appName = ctx.request.param('appName');

        if (!appName) {
            throw ApplicationError.RequiredAttributes();
        }

        const app = (await this.pmService.describe(appName));
        if (!app) throw ApplicationError.NotFound();

        app.git_branch = await this.gitService.branch(app.pm2_env_cwd);
        app.git_commit = await this.gitService.commit(app.pm2_env_cwd);
        app.env_file = await this.envService.get(app.pm2_env_cwd, true);

        ctx.context.app = app;
    }
}
