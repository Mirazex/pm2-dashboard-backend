import { Controller } from '@/core/Controller';
import ExceptionHandler from '@/core/ExceptionHandler';
import Singleton from '@/core/utils/singleton';
import compression from 'compression';
import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export class Server extends Singleton {
    express: Express;
    port: number;

    constructor(port: number) {
        super();

        this.express = express();
        this.port = port;

        this.initialize();
    }

    private initialize() {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json({ limit: 1024 }));
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    async registerControllers(prefix = '/api', controllers: typeof Controller[]) {
        for (const controller of controllers) {
            const router = controller.register(prefix)
            this.express.use(router);
        }
    }

    registerErrorHandling() {
        this.express.use(ExceptionHandler);
    }

    listen() {
        this.express.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}
