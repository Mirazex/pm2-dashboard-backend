import {exec} from 'node:child_process';

class GitService {

    async branch(cwd) {
        return new Promise((resolve) => {
            exec('git rev-parse --abbrev-ref HEAD', {cwd}, (err, stdout) => {
                if (!err && typeof stdout === 'string') {
                    return resolve(stdout.trim());
                }
                resolve(null);
            });
        });
    }

    async commit(cwd) {
        return new Promise((resolve) => {
            exec('git rev-parse --short HEAD', {cwd}, (err, stdout) => {
                if (!err && typeof stdout === 'string') {
                    return resolve(stdout.trim());
                }
                resolve(null);
            });
        });
    }

}

export default new GitService();
