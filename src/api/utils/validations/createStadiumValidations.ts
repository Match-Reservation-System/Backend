import joi from 'joi';
import stadium from '../../types/models/stadium';

const createStadiumValidations = (stadium: stadium) => {
  const schema = joi.object({
    name: joi.string().required(),
    city: joi.string().required(),
    rows: joi.number().integer().min(1).required(),
    seats_per_row: joi.number().integer().min(1).required(),
  });
  return schema.validate(stadium);
};

export default createStadiumValidations;
