import EnvService from './EnvService.js';
import Auth from "@/lib/helpers/Auth.js";
import Env from "@/lib/helpers/Env.js";
import ApplicationError from "@/lib/helpers/ApplicationError.js";


class UserService {
    envService = EnvService;

    create(credentials) {
        const data = {
            username: credentials.username,
            password: Auth.hashPassword(credentials.password),
        };

        this.envService.write({
            ADMIN_USERNAME: data.username,
            ADMIN_PASSWORD: data.password,
        });

        Env.set('ADMIN_USERNAME', data.username);
        Env.set('ADMIN_PASSWORD', data.password);
    }

    async validate(credentials) {
        if (credentials.username !== Env.get('ADMIN_USERNAME')) throw ApplicationError.InvalidCredentials();

        const isCorrect = Auth.checkPassword(credentials.password, Env.get('ADMIN_PASSWORD'));
        if (!isCorrect) throw ApplicationError.InvalidCredentials();

        return true;
    }
}

export default new UserService();
