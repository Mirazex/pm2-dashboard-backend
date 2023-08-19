import 'dotenv/config';

import path from "node:path";
import Env from '@/lib/helpers/Env.js';
import GlobFile from "@/lib/helpers/GlobFile.js";
import Server from "@/lib/core/Server.js";
import EnvService from './services/EnvService.js';
import Auth from "@/lib/helpers/Auth.js";


if (!Env.get("ADMIN_USERNAME", false) || !Env.get("ADMIN_PASSWORD", false)) {
    console.log("You must first setup admin user. Run command -> yarn create:admin");
    process.exit(2);
}

if (!Env.get("SESSION_SECRET", false)) {
    const secret = Auth.createHash();
    EnvService.write({
        SESSION_SECRET: secret
    });
    Env.set("SESSION_SECRET", secret);
}

const port = Env.get('PORT');
const controllers = await GlobFile.load(path.resolve('src/controllers/**/*.js'));

const server = new Server(Number(port));

await server.registerControllers('/api', controllers);
server.registerErrorHandling();

server.listen();


