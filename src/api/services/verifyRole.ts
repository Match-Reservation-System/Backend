import {Request,Response, NextFunction} from 'express';

const verifyRole = (role: string) => (req: Request, res: Response, next: NextFunction) => {
  if (req.role !== role) {
    res.status(403).json({ error: 'Unauthorized' });
    return;
  }
  //TODO check if user exists in database
  next();
};

export default verifyRole;