import joi from 'joi';
import { match } from '../../types/models/match';

const validateMatchData = (match: match) => {
    const schema = joi.object({
        stadium_id: joi.number().required(),
        date: joi.date().required(),
        home_team: joi.string().required(),
        away_team: joi.string().required(),
        main_referee: joi.string().required(),
        first_line_referee: joi.string().required(),
        second_line_referee: joi.string().required(),
        ticket_price: joi.number().required()
    });
    return schema.validate(match);
}

export default validateMatchData;
