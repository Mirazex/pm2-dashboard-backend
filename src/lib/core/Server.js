import ServerException from '@/lib/helpers/ServerException.js';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export default class Server {
    constructor(port) {
        this.express = express();
        this.port = port;

        this.#initialize();
    }

    #initialize() {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(morgan('dev'));
        this.express.use(express.json({ limit: 1024 }));
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(compression());
    }

    async registerControllers(prefix = '/api', controllers = []) {
        for (const controller of controllers) {
            const router = controller.register(prefix);
            this.express.use(router);
        }
    }

    registerErrorHandling() {
        this.express.use(ServerException);
    }

    listen() {
        this.express.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}
