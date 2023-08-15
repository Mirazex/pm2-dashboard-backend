import ApplicationError from '@/core/ApplicationError';
import { Controller } from '@/core/Controller';
import Env from '@/core/Env';
import { HttpContext } from '@/core/HttpContext';
import { generateToken, validatePassword } from '@/core/utils/auth';
import LoginValidator from '@/server/validators/LoginValidator';

export default class Login extends Controller {
    path = '/auth/login';
    method = Controller.RequestMethod.POST;
    validationSchema = LoginValidator;

    public async request(ctx: HttpContext) {
        const username = ctx.request.input('username');
        const password = ctx.request.input('password');

        const ADMIN_USERNAME = Env.get('ADMIN_USERNAME');
        const ADMIN_PASSWORD = Env.get('ADMIN_PASSWORD');

        if (username !== ADMIN_USERNAME) {
            throw ApplicationError.InvalidCredentials()
        }

        const isValidPassword = validatePassword(password, ADMIN_PASSWORD);
        if (!isValidPassword) {
            throw ApplicationError.InvalidCredentials()
        }

        return generateToken({
            username: ADMIN_USERNAME,
        });
    }
}
