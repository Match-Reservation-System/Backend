import joi from 'joi';
import { admin, manager,fan } from '../../../roles/roles';
import { user } from '../../../types/models/user';

const validateSignupData = (signup: user) => {
    const schema = joi.object({
        user_name: joi.string().min(3).max(30).required(),
        first_name: joi.string().min(3).max(30).required(),
        last_name: joi.string().min(3).max(30).required(),
        email: joi.string().email().required(),
        password: joi.alternatives().try(joi.string(), joi.number()).required(),
        gender: joi.string().valid('male','female').required(),
        nationality: joi.string().optional(),
        birth_date: joi.date().required(),
        role: joi.string().valid(admin, manager, fan).required()
    });
    return schema.validate(signup);
}

export default validateSignupData;
