import jwt from "jsonwebtoken";
import UserService from "../services/UserService.js";
import Middleware from "@/lib/core/Middleware.js";
import ApplicationError from "@/lib/helpers/ApplicationError.js";
import Env from "@/lib/helpers/Env.js";

export default class CheckAuth extends Middleware {
    userService = UserService;

    async use(ctx) {
        const header = ctx.request.header(`authorization`);

        if (!header || !header.trim()) {
            throw ApplicationError.NoAuthHeader();
        }

        const accessToken = header.split(` `)[1];
        ctx.context.accessToken = accessToken;

        // Check User
        try {
            jwt.verify(accessToken, Env.get("USER_JWT_SECRET"));
        } catch (e) {
            throw ApplicationError.BadUserToken();
        }

    }
}
