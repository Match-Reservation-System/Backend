import joi from 'joi';
import { reservation } from '../../types/models/reservation';

const validateReservationData = (reservation: reservation) => {
  const schema = joi.object({
    match_id: joi.number().required(),
    row: joi.number().min(0).required(),
    seat: joi.number().min(0).required(),
  });
  return schema.validate(reservation);
};

export default validateReservationData;
