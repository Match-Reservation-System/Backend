import joi from 'joi';
import { reservation } from '../../types/models/reservation';

const validateReservationData = (reservation: reservation) => {
    const schema = joi.object({
        match_id: joi.number().required(),
        row: joi.number().required(),
        seat: joi.number().required()
    });
    return schema.validate(reservation);
}

export default validateReservationData;
