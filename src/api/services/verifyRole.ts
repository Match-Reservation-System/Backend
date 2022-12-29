import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

const verifyRole =
  (role: string) => (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.role !== role) {
        res.status(403).json({ error: 'Unauthorized' });
        return;
      }
      //TODO check if user exists in database
      const user = User.getUserById(req.user as number);
      if (!user) {
        res.status(403).json({ error: 'Unauthorized' });
        return;
      }
      next();
    } catch (err) {
      throw new Error(`Could not find user ${req.user}. Error: ${err}`);
    }
  };

export default verifyRole;
