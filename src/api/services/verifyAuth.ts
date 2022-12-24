import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res.status(401).json({ error: 'No authorization header' });
      return;
    }
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_PRIVATE_KEY as string);
    next();
  } catch (error: unknown) {
    const typedError = error as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

export default verifyAuthToken;
