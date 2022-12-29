import joi from 'joi';
import { user } from '../../types/models/user';

const validateUpdateUserData = (user: user) => {
  const schema = joi
    .object({
      first_name: joi.string().min(3).max(30).optional(),
      last_name: joi.string().min(3).max(30).optional(),
      password: joi.alternatives().try(joi.string(), joi.number()).optional(),
      gender: joi.string().valid('male', 'female').optional(),
      nationality: joi.string().optional(),
      birth_date: joi.date().optional(),
    })
    .min(1);
  return schema.validate(user);
};

export default validateUpdateUserData;
