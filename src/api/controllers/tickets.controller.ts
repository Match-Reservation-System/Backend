import { Request, Response } from 'express';
import Reservation from '../models/reservation.model';
import validateLoginData from '../utils/validations/loginValidation';

const getUserTickets = async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.query.user_id);
    const tickets = await Reservation.getReservationsByUserId(user_id);
    if (!tickets) {
      res
        .status(401)
        .json({ error: 'Invalid credentials user does not exist' });
      return;
    }
    else {
        res.json({tickets: tickets})
    }
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

export default getUserTickets;
