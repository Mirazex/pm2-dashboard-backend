import HttpContext from "@/lib/core/HttpContext.js";
import ApplicationError from '@/lib/helpers/ApplicationError.js';
import Request from '@/lib/core/Request.js';
import Response from '@/lib/core/Response.js';
import { Router } from 'express';
import Joi from 'joi';
import path from 'node:path';

export default class Controller {
    static RequestMethod = {
        GET: 'get',
        POST: 'post',
        PATCH: 'patch',
        PUT: 'put',
        DELETE: 'delete',
    };

    router = Router();
    path = '/';
    method = Controller.RequestMethod.GET;
    middlewares = [];
    validationSchema = null;

    request(ctx) {
        throw ApplicationError.MethodNotImplemented('request');
    }

    async #validate(ctx) {
        if (!this.validationSchema || !Joi.isSchema(this.validationSchema)) return;

        const objectToValidate = this.method === Controller.RequestMethod.GET ? ctx.request.qs : ctx.request.input();

        try {
            const value = await this.validationSchema.validateAsync(objectToValidate, { stripUnknown: true });

            const object = this.method === Controller.RequestMethod.GET ? '_query' : '_body';
            ctx.request[object] = value;
        } catch (e) {
            if (e instanceof Joi.ValidationError) {
                const message = e.details.map((i) => i.message).join(`,`);
                throw ApplicationError.JsonValidation(message);
            }
        }
    }

    async #handle(_request, _response, next) {
        try {
            const request = new Request(_request);
            const response = new Response(_response);

            const ctx = new HttpContext(request, response, next);

            await this.#validate(ctx);
            await Promise.all(this.middlewares.map(middleware => middleware.register(ctx)));

            const data = await this.request(ctx);
            if (!_response.headersSent) {
                return _response.status(200).json({
                    success: true,
                    statusCode: 200,
                    data,
                });
            }
        } catch (e) {
            next(e);
        }
    }

    static register(prefix) {
        const controller = new this();
        const route = path.join(prefix, controller.path).replaceAll("\\", "/");
        controller.router[controller.method](route, controller.#handle.bind(controller));
        console.log(`added '${controller.method.toUpperCase()}' controller for route '${route}'`);
        return controller.router;
    }
}
