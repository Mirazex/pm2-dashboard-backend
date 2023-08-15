import ApplicationError from "@/core/ApplicationError";
import Env from "@/core/Env";
import { HttpContext } from '@/core/HttpContext';
import { Middleware } from '@/core/Middleware';
import jwt from "jsonwebtoken";
import UserService from "../services/UserService";

export default class CheckAuth extends Middleware {
    userService = UserService;

    public async use(ctx: HttpContext) {
        const header = ctx.request.header(`authorization`);

        if (!header || !header.trim()) {
            throw ApplicationError.NoAuthHeader();
        }

        const accessToken = header.split(` `)[1];
        ctx.context.accessToken = accessToken

        // Check User
        try {
            jwt.verify(accessToken, Env.get("USER_JWT_SECRET"));
        } catch (e) {
            throw ApplicationError.BadUserToken()
        }

    }
}
