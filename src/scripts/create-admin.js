import 'dotenv/config';

import UserService from '@/services/UserService.js';
import prompts from 'prompts';

const regex = {
    username: /^(?=.{4,}$)[a-z0-9_]+$/,
    password: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
};

const questions = [
    {
        type: 'text',
        name: 'username',
        message: 'Admin Username',
        validate: (value) => {
            value = value.trim();
            if (!value) return 'App username is required';
            else if (value.length < 4) return 'App username must have atleast 4 characters';
            else if (!regex.username.test(value)) return 'App username can only contain Lowercase letters (a-z), Numbers (0-9) and Underscores (_)';
            return true;
        },
    },
    {
        type: 'password',
        name: 'password',
        message: 'Admin Password',
        validate: (value) => {
            if (!value) return 'App password is required';
            else if (value.length < 4) return 'App username must have mininum 8 characters';
            else if (!regex.password.test(value)) return 'App username must contain at least a symbol, upper and lower case letters and a number';
            return true;
        },
    },
    {
        type: 'confirm',
        name: 'agreed',
        message: 'Confirm to create/update admin user ?',
    },
];

async function bootstrap() {
    const result = await prompts(questions);

    if (result.agreed) {
        UserService.create({
            username: result.username,
            password: result.password,
        });
    }
}

bootstrap();
