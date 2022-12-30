import Match from '../models/match.model';
import { Request, Response } from 'express';
import validateGetMatches from '../utils/validations/getMatchesValidation';

export const getMatches = async (req: Request, res: Response) => {
  try {
    const { error } = validateGetMatches(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const matches = await Match.getAllMatchesByDate(req.body.date);
    //convert date of every match to local time
    matches?.forEach(match => {
      // remove the timezone offset
      match.date = new Date(
        match.date.getTime() - match.date.getTimezoneOffset() * 60 * 1000
      );
    });
    res.json({ matches: matches });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};
