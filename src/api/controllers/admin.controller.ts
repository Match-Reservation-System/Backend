import { Request, Response } from 'express';
import User from '../models/user.model';

export const getUnverifiedMangers = async (req: Request, res: Response) => {
  try {
    const users = await User.getUnverifiedManagers();
    res.json({ users: users });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

export const verifyManager = async (req: Request, res: Response) => {
  try {
    const manager_id = Number(req.params.manager_id);
    const manager = await User.getUserById(manager_id);
    if (!manager) return res.status(404).send({ err: 'User not found.' });

    await User.verifyManager(manager_id);
    res.json(
      {message: `Verified manager`, manager_id: manager_id, email: manager.email}
    );
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.getAllUsers();
    res.json({ users: users });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params.user_id);
    const user = await User.getUserById(user_id);
    if (!user) return res.status(404).send({ err: 'User not found.' });
    const deletedUser = await User.deleteUser(user_id);
    if(!deletedUser) return res.status(404).send({ err: 'Unable to delete user' });
    res.json(
      {message: `Deleted user`, user_id: user_id, email: user.email}
    );
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

