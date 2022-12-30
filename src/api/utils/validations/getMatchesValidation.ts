import joi from 'joi';

const validateGetMatches = (date: string) => {
  const schema = joi.object({
    date: joi.date().required(),
  });
  return schema.validate(date);
};

export default validateGetMatches;
