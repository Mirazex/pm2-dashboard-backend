import pm2 from 'pm2';
import Instance from "@/models/Instance.js";


class PMService {
    async list() {
        const apps = await new Promise((resolve, reject) => {
            pm2.connect((err) => {
                if (err) reject(err);

                pm2.list((err, apps) => {
                    pm2.disconnect();
                    if (err) reject(err);

                    return resolve(apps);
                });
            });
        });

        return apps.map(app => new Instance(app));
    }

    async describe(appName) {
        const app = await new Promise((resolve, reject) => {
            pm2.connect((err) => {
                if (err) reject(err);

                pm2.describe(appName, (err, apps) => {
                    pm2.disconnect();
                    if (err) reject(err);

                    if (Array.isArray(apps) && apps.length > 0) {
                        return resolve(apps[0]);
                    }

                    return resolve(null);
                });
            });
        });

        return app ? new Instance(app) : null;
    }

    reload(process) {
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

    stop(process) {
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

    restart(process) {
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
