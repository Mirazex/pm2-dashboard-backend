import { exec } from 'child_process';

class GitService {

    async branch(cwd: string) {
        return new Promise((resolve) => {
            exec('git rev-parse --abbrev-ref HEAD', { cwd }, (err, stdout) => {
                if (!err && typeof stdout === 'string') {
                    return resolve(stdout.trim());
                }
                resolve(null);
            });
        });
    }

    async commit(cwd: string) {
        return new Promise((resolve) => {
            exec('git rev-parse --short HEAD', { cwd }, (err, stdout) => {
                if (!err && typeof stdout === 'string') {
                    return resolve(stdout.trim());
                }
                resolve(null);
            });
        });
    }

}

export default new GitService();
