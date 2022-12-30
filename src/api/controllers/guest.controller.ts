import Match from "../models/match.model";
import { Request, Response } from "express";

export const getMatches = async (req: Request, res: Response) => {
  try {
    const matches = await Match.getAllMatches();
    res.json({ matches: matches });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};
