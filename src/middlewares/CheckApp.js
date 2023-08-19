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

        const app = await this.pmService.describe(appName);
        if (!app) throw ApplicationError.NotFound();

        app.git = {
            remote: this.gitService.getRemoteUrl(app.cwd),
            branch: this.gitService.getCurrentBranch(app.cwd),
            last_commit: this.gitService.getLastCommit(app.cwd),
        };

        app.environment = await this.envService.get(app.cwd, true);

        ctx.context.app = app;
    }
}
