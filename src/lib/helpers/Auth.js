import ApplicationError from './ApplicationError.js';
import Env from './Env.js';
import jwt from 'jsonwebtoken';
import {compareSync, hashSync} from "bcrypt";

export default class Auth {

    static createToken(payload) {
        const ttl = Number.parseInt(Env.get('USER_JWT_EXPIRE'));
        const accessExpireDate = Date.now() + ttl * 1000;

        return {
            expire: accessExpireDate,
            token: jwt.sign(payload, Env.get('USER_JWT_SECRET'), {expiresIn: ttl}),
        };
    }

    static hashPassword(password) {
        if (!password) {
            throw ApplicationError.RequiredAttributes();
        }

        return hashSync(password, 10);
    }

    static checkPassword(password, hash) {
        const result = compareSync(password, hash);

        if (!password || !hash || !result) {
            throw ApplicationError.InvalidCredentials();
        }

        return true;


    }

    static createHash() {
        return crypto.randomBytes(20).toString('hex');
    }
}
