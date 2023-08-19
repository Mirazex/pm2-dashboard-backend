import LoginValidator from '@/validators/LoginValidator.js';
import Controller from "@/lib/core/Controller.js";
import Env from "@/lib/helpers/Env.js";
import ApplicationError from "@/lib/helpers/ApplicationError.js";
import Auth from "@/lib/helpers/Auth.js";

export default class Login extends Controller {
    path = '/auth/login';
    method = Controller.RequestMethod.POST;
    validationSchema = LoginValidator;

    async request(ctx) {
        const username = ctx.request.input('username');
        const password = ctx.request.input('password');

        const ADMIN_USERNAME = Env.get('ADMIN_USERNAME');
        const ADMIN_PASSWORD = Env.get('ADMIN_PASSWORD');

        if (username !== ADMIN_USERNAME) {
            throw ApplicationError.InvalidCredentials();
        }

        const isValidPassword = Auth.checkPassword(password, ADMIN_PASSWORD);
        if (!isValidPassword) {
            throw ApplicationError.InvalidCredentials();
        }

        return Auth.createToken({
            username: ADMIN_USERNAME,
        });
    }
}
