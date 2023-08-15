import 'dotenv/config';
import "./aliases"

import { createServer } from '@/server';
import Env from './core/Env';
import { getRandomHash } from './server/utils/random';
import EnvService from './server/services/EnvService';

if (!Env.get("ADMIN_USERNAME", false) || !Env.get("ADMIN_PASSWORD", false)) {
    console.log("You must first setup admin user. Run command -> yarn create:admin")
    process.exit(2)
}

if (!Env.get("SESSION_SECRET", false)) {
    const secret = getRandomHash();
    EnvService.write({
        SESSION_SECRET: secret
    })
    Env.set("SESSION_SECRET", secret)
}

createServer()
