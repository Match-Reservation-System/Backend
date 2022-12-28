import { match } from 'assert';
import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import Match from '../models/match.model';
import validateMatchData from '../utils/validations/managerValidation';

const createMatch = async (req: Request, res: Response) => {
  try {
    const { error } = validateMatchData(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const current_match_date = new Date(req.body.date);

    // A team can have at maximum one match per day
    const home_team_matches = await Match.getTeamMatches(req.body.home_team);
    for(let i in home_team_matches)
    {
        const date = home_team_matches[Number(i)]['date'];
        if(date.toDateString()==current_match_date.toDateString())
            return res.status(400).send({ err: 'can not create, home team has another match at the same day.'});
    }

    const away_team_matches = await Match.getTeamMatches(req.body.away_team);
    for(let i in away_team_matches)
    {
        const date = away_team_matches[Number(i)]['date'];
        if(date.toDateString()==current_match_date.toDateString())
            return res.status(400).send({ err: 'can not create, away team has another match at the same day.'});
    }

    const match_id = await Match.createMatch(req.body);

    res.json({match_id: match_id['id']});

    // A stadium can hold 1 match at a maximum per day
    // Match earliest start is 8.00 in the morning and latest start is 8.00 at night

  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

export { createMatch };
