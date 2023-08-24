import 'dotenv/config';

import prompts from 'prompts';
import EnvService from "@/services/EnvService.js";

const regex = {
    JWT_SECRET: /^[a-zA-Z0-9]{32}$/,
    JWT_EXPIRES: /^[0-9]+$/,
    PORT: /^[0-9]+$/,
};

const questions = [
    {
        type: 'text',
        name: 'PORT',
        message: 'Port',
        validate: (value) => {
            value = value.trim();
            if (!value) return 'Port is required';
            else if (!regex.PORT.test(value)) return 'Port must be a number';
            return true;
        }
    },
    {
        type: 'text',
        name: 'JWT_SECRET',
        message: 'JWT Secret',
        validate: (value) => {
            value = value.trim();
            if (!value) return 'JWT Secret is required';
            else if (!regex.JWT_SECRET.test(value)) return 'JWT Secret must have 32 characters';
            return true;
        },
    },
    {
        type: 'text',
        name: 'JWT_EXPIRES',
        message: 'JWT Expires',
        validate: (value) => {
            value = value.trim();
            if (!value) return 'JWT Expires is required';
            else if (!regex.JWT_EXPIRES.test(value)) return 'JWT Expires must be a number';
            return true;
        },
    }
];


const result = await prompts(questions);
if (!result) process.exit(0);

EnvService.write({
    PORT: result.PORT,
    USER_JWT_SECRET: result.JWT_SECRET,
    USER_JWT_EXPIRE: result.JWT_EXPIRES,
});



