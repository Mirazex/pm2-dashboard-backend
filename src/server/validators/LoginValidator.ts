import Joi from 'joi';

export default Joi.object<{ username: string, password: string }>({
    username: Joi.string().required(),
    password: Joi.string().required(),
});
