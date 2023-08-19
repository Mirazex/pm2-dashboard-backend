export default class Instance {
    constructor(data) {
        this.id = data.pm_id;
        this.name = data.name;
        this.monit = data.monit;
        this.cwd = data.pm2_env.pm_cwd;
        this.logs = {
            output: data.pm2_env.pm_out_log_path,
            error: data.pm2_env.pm_err_log_path,
        };
        this.state = {
            status: data.pm2_env.status,
            autorestart: data.pm2_env.autorestart ?? false,
            uptime: data.pm2_env.pm_uptime,
            restart_count: data.pm2_env.restart_time,
            node_version: data.pm2_env.node_version,
        };
    }
}
