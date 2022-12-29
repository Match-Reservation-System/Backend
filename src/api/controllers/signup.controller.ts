import { Request, Response } from 'express';
import User from '../models/user.model';
import validateSignupData from '../utils/validations/signupValidation';
import getToken from '../utils/createToken';
import hashPassword from '../utils/hashPassword';

const signup = async (req: Request, res: Response) => {
  try {
    const { error } = validateSignupData(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email } = req.body;
    const user = await User.getUserByEmail(email);
    if (user) return res.status(400).json({ error: 'Email already exists' });

    const hashedPassword = hashPassword(req.body.password);
    if (req.body.role === 'admin') {
      return res
        .status(400)
        .json({ error: 'You cannot create an admin account' });
    }
    if (req.body.role === 'fan' || req.body.role === 'admin') {
      req.body.is_verified = true;
    }
    if (req.body.role === 'manager') {
      req.body.is_verified = false;
    }
    if (!req.body.nationality) {
      req.body.nationality = null;
    }
    const newUser = {
      ...req.body,
      password: hashedPassword,
    };
    const createdUser = await User.createUser(newUser);
    if (req.body.role === 'fan') {
      const token = getToken(createdUser.id, createdUser.role);
      return res.status(201).json({ token, user: createdUser });
    } else {
      return res.status(201).json({ user: createdUser });
    }
  } catch (err: unknown) {
    const typedError = err as Error;
    return res.status(400).json({ error: typedError?.message });
  }
};

export default signup;
