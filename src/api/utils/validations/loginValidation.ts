import joi from 'joi';

const validateLoginData = (login: {
    email: string;
    password: string;
}) =>{
    const schema = joi.object({
        email: joi.string().email().required(),
        // password can be string or number
        password: joi.alternatives().try(joi.string(), joi.number()).required()

    });
    return schema.validate(login);
}

export default validateLoginData;