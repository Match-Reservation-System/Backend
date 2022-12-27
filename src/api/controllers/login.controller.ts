import { Request, Response } from 'express';
import getToken from '../utils/createToken';
import User from '../models/user.model';
import verifyPassword from '../utils/verifyPassword';
import validateLoginData from '../utils/validations/loginValidation';

const login = async (req: Request, res: Response) => {
  try {
    const { error } = validateLoginData(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }
    const { email, password } = req.body;
    const user = await User.getUserByEmail(email);
    if (!user) {
      res
        .status(401)
        .json({ error: 'Invalid credentials user does not exist' });
      return;
    }
    if (!user.is_verified) {
      res
        .status(401)
        .json({ error: 'Invalid credentials user is not verified' });
      return;
    }
    const authenticatedUser = await verifyPassword(email, password);
    if (authenticatedUser) {
      const token = getToken(authenticatedUser.id, authenticatedUser.role);
      res.json({
        token,
        user: {
          id: authenticatedUser.id,
          role: authenticatedUser.role,
        },
      });
    } else {
      res.status(401).json({ error: 'Invalid credentials wrong password' });
    }
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};
export default login;
