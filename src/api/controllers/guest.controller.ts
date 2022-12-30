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

export const getMatch = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid match id.' });
      return;
    }
    const match = await Match.getMatchById(id);
    if (!match) {
      res.status(404).json({ error: 'Match not found.' });
      return;
    }
    // remove the timezone offset
    match.date = new Date(
      match.date.getTime() - match.date.getTimezoneOffset() * 60 * 1000
    );
    res.json({ match: match });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};
