import { Request, Response } from 'express';
import Match from '../models/match.model';
import {
  validateMatchData,
  validateMatchWithIdData,
} from '../utils/validations/managerValidation';
import createStadiumValidations from '../utils/validations/createStadiumValidations';
import Stadium from '../models/stadium.model';
import stadium from '../types/models/stadium';

const createMatch = async (req: Request, res: Response) => {
  try {
    const { error } = validateMatchData(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const current_match_date = new Date(req.body.date);

    // A team can have at maximum one match per day
    const home_team_matches = await Match.getTeamMatches(req.body.home_team);
    for (const i in home_team_matches) {
      const date = home_team_matches[Number(i)]['date'];
      if (date.toDateString() == current_match_date.toDateString())
        return res.status(400).send({
          error: 'can not create, home team has another match at the same day.',
        });
    }

    const away_team_matches = await Match.getTeamMatches(req.body.away_team);
    for (const i in away_team_matches) {
      const date = away_team_matches[Number(i)]['date'];
      if (date.toDateString() == current_match_date.toDateString())
        return res.status(400).send({
          error: 'can not create, away team has another match at the same day.',
        });
    }

    const match_id = await Match.createMatch(req.body);

    res.json({ match_id: match_id['id'] });
    //TODO: return new match details
    //TODO: A stadium can hold 1 match at a maximum per day
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

const updateMatch = async (req: Request, res: Response) => {
  try {
    const { error } = validateMatchWithIdData(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const match = await Match.getMatchById(req.body.id);
    console.log(match);
    if (!match) return res.status(404).send({ error: 'Match not found.' });

    const current_match_date = new Date(req.body.date);

    // A team can have at maximum one match per day
    const home_team_matches = await Match.getTeamMatches(req.body.home_team);
    for (const i in home_team_matches) {
      const id = home_team_matches[Number(i)]['id'];
      if (id == req.body.id) continue;
      const date = home_team_matches[Number(i)]['date'];
      if (date.toDateString() == current_match_date.toDateString())
        return res.status(400).send({
          error: 'can not update, home team has another match at the same day.',
        });
    }

    const away_team_matches = await Match.getTeamMatches(req.body.away_team);
    for (const i in away_team_matches) {
      const id = away_team_matches[Number(i)]['id'];
      if (id == req.body.id) continue;
      const date = away_team_matches[Number(i)]['date'];
      if (date.toDateString() == current_match_date.toDateString())
        return res.status(400).send({
          error: 'can not update, away team has another match at the same day.',
        });
    }

    await Match.updateMatch(req.body);

    res.json({ message: `successfully updated match with id ${req.body.id}.` });
    //TODO: return new match details
    //TODO: A stadium can hold 1 match at a maximum per day
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

const createStadium = async (req: Request, res: Response) => {
  try {
    const { error } = createStadiumValidations(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    // if the name is already taken in the same city return error
    const newStadium: stadium = req.body;
    const existingStadium = await Stadium.getStadiumByNameAndCity(
      newStadium.name,
      newStadium.city
    );
    if (existingStadium)
      return res.status(400).send({
        error: 'Stadium with the same name already exists in this location.',
      });

    const createdStadium = await Stadium.createStadium(newStadium);
    res.json({ stadium: createdStadium });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

const getStadiums = async (req: Request, res: Response) => {
  try {
    const stadiums = await Stadium.getStadiums();
    res.json({ stadiums: stadiums });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

export { createMatch, updateMatch, createStadium, getStadiums };
