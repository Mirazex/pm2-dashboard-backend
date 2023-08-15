import { hashPassword, validatePassword } from '@/core/utils/auth';
import EnvService from './EnvService';
import Env from '@/core/Env';
import ApplicationError from '@/core/ApplicationError';

class UserService {
    envService = EnvService;

    create(credentials: { username: string; password: string }) {
        const data = {
            username: credentials.username,
            password: hashPassword(credentials.password),
        }

        this.envService.write({
            ADMIN_USERNAME: data.username,
            ADMIN_PASSWORD: data.password,
        });

        Env.set('ADMIN_USERNAME', data.username);
        Env.set('ADMIN_PASSWORD', data.password);
    }

    async validate(credentials: { username: string; password: string }) {
        if (credentials.username !== Env.get('ADMIN_USERNAME')) throw ApplicationError.InvalidCredentials();

        const isCorrect = validatePassword(credentials.password, Env.get('ADMIN_PASSWORD'));
        if (!isCorrect) throw ApplicationError.InvalidCredentials();

        return true;
    }
}

export default new UserService();
