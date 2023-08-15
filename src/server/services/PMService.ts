import pm2 from 'pm2';
import { bytesToSize, timeSince } from '../utils/format';

class PMService {
    list() {
        return new Promise((resolve, reject) => {
            pm2.connect((err) => {
                if (err) reject(err);

                pm2.list((err, apps) => {
                    pm2.disconnect();
                    if (err) reject(err);

                    apps = apps.map((app) => ({
                        name: app.name,
                        status: app.pm2_env?.status,
                        cpu: app.monit?.cpu,
                        memory: bytesToSize(app.monit?.memory || 0),
                        uptime: timeSince(app.pm2_env?.pm_uptime || 0),
                        pm_id: app.pm_id,
                    }));

                    resolve(apps);
                });
            });
        });
    }

    describe(appName: string) {
        return new Promise((resolve, reject) => {
            pm2.connect((err) => {
                if (err) reject(err);

                pm2.describe(appName, (err, apps) => {
                    pm2.disconnect();
                    if (err) reject(err);

                    if (Array.isArray(apps) && apps.length > 0) {
                        const app = {
                            name: apps[0].name,
                            status: apps[0].pm2_env?.status,
                            cpu: apps[0].monit?.cpu,
                            memory: bytesToSize(apps[0].monit?.memory || 0),
                            uptime: timeSince(apps[0].pm2_env?.pm_uptime || 0),
                            pm_id: apps[0].pm_id,
                            pm_out_log_path: apps[0].pm2_env?.pm_out_log_path,
                            pm_err_log_path: apps[0].pm2_env?.pm_err_log_path,
                            pm2_env_cwd: apps[0].pm2_env?.pm_cwd,
                        };

                        resolve(app);
                    } else resolve(null);
                });
            });
        });
    }

    reload(process: string) {
        return new Promise((resolve, reject) => {
            pm2.connect((err) => {
                if (err) reject(err);

                pm2.reload(process, (err, proc) => {
                    pm2.disconnect();
                    if (err) reject(err);

                    resolve(proc);
                });
            });
        });
    }

    stop(process: string) {
        return new Promise((resolve, reject) => {
            pm2.connect((err) => {
                if (err) reject(err);

                pm2.stop(process, (err, proc) => {
                    pm2.disconnect();
                    if (err) reject(err);

                    resolve(proc);
                });
            });
        });
    }

    restart(process: string) {
        return new Promise((resolve, reject) => {
            pm2.connect((err) => {
                if (err) reject(err);

                pm2.restart(process, (err, proc) => {
                    pm2.disconnect();
                    if (err) reject(err);

                    resolve(proc);
                });
            });
        });
    }
}

export default new PMService();
