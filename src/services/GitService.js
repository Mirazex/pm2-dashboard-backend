import {execSync} from 'node:child_process';

class GitService {

    getCurrentBranch(cwd) {
        const branch = execSync('git rev-parse --abbrev-ref HEAD', {cwd}).toString().trim();
        const remoteUrl = this.getRemoteUrl(cwd);
        return {
            name: branch,
            url: `${remoteUrl}/tree/${branch}`
        };
    }

    getLastCommit(cwd) {
        const commit = execSync('git rev-parse --short HEAD', {cwd}).toString().trim();
        const remoteUrl = this.getRemoteUrl(cwd);
        const message = execSync('git log -1 --pretty=%B', {cwd}).toString().trim();
        return {
            hash: commit,
            url: `${remoteUrl}/commit/${commit}`,
            message
        };
    }

    getRemoteUrl(cwd) {
        return execSync('git config --get remote.origin.url', {cwd}).toString().trim();
    }

}

export default new GitService();
