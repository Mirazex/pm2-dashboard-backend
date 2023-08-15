import ApplicationError from '@/core/ApplicationError';
import Env from '@/core/Env';
import jwt from 'jsonwebtoken';
import {compareSync, hashSync} from "bcrypt";

export const generateToken = (payload: any) => {
    const ttl = Number.parseInt(Env.get('USER_JWT_EXPIRE'));
    const accessExpireDate = Date.now() + ttl * 1000;

    return {
        expire: accessExpireDate,
        token: jwt.sign(payload, Env.get('USER_JWT_SECRET'), { expiresIn: ttl }),
    };
};

export const hashPassword = (password: string) => {
    if (!password) {
        throw ApplicationError.RequiredAttributes();
    }

    return hashSync(password, 10);
};

export const validatePassword = (password: string, hash: string) => {
    const result = compareSync(password, hash);

    if (!password || !hash || !result) {
        throw ApplicationError.InvalidCredentials();
    }

    return true;
};
