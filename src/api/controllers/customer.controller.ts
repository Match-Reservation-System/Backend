import { Request, Response } from 'express';
import Match from '../models/match.model';
import Reservation from '../models/reservation.model';
import validateReservationData from '../utils/validations/reserveTicketValidation';
import User from '../models/user.model';
import { user } from '../types/models/user';
import hashPassword from '../utils/auth/hashPassword';
import validateUpdateUserData from '../utils/validations/updateCustomerInfoValidation';

const getUserTickets = async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params.user_id);

    if (user_id != req.user) {
      res
        .status(401)
        .json({ error: 'Invalid credentials user is not authorized' });
      return;
    }

    const tickets = await Reservation.getReservationsByUserId(user_id);
    res.json({ tickets: tickets });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

const deleteTicket = async (req: Request, res: Response) => {
  try {
    const ticket_id = Number(req.params.ticket_id);
    if (isNaN(ticket_id))
      return res.status(400).send({ error: 'Invalid ticket id.' });
    const ticket = await Reservation.getReservationById(ticket_id);
    if (!ticket || ticket.user_id != req.user)
      return res
        .status(404)
        .send({ error: 'Tickets not found or does not belong to this user.' });

    const match = await Match.getMatchById(ticket.match_id);
    if (match == null)
      return res.status(404).send({ error: 'Match not found.' });

    const days_before_match =
      (match.date.getTime() - Date.now()) / (1000 * 3600 * 24);
    console.log(days_before_match);

    if (days_before_match < 3)
      return res
        .status(400)
        .send({ error: 'Can not cancel, match starts in less than 3 days.' });
    //TODO: RETURN THE DELETED TICKET
    await Reservation.deleteReservationByID(ticket_id);

    res.json({ message: `successfully deleted ticket with id ${ticket_id}.` });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

const getReservedSeats = async (req: Request, res: Response) => {
  try {
    const match_id = Number(req.params.match_id);
    if (isNaN(match_id))
      return res.status(400).send({ error: 'Invalid match id.' });
    const tickets = await Reservation.getReservationsByMatchId(match_id);
    res.json({ tickets: tickets });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

const reserveTicket = async (req: Request, res: Response) => {
  try {
    const { error } = validateReservationData(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    req.body.user_id = req.user;

    //TODO: check if in the boundaries of the stadium
    //TODO: check if the seat is not reserved already (can be skipped but message will be a db generated message)
    //TODO: we might add stripe payment here

    //check if he did not reserve a ticket for a match with conflict time
    const match = await Match.getMatchById(req.body.match_id);
    if (match == null)
      return res.status(404).send({ error: 'Match not found.' });

    const dates = await Match.getUserReservedMatches(Number(req.user));
    for (const i in dates) {
      const id = dates[Number(i)]['id'];
      if (id == match.id) continue;

      const date = dates[Number(i)]['date'];
      const start1 = date.getTime(),
        end1 = date.getTime() + 2 * 60 * 60 * 1000;
      const start2 = match.date.getTime(),
        end2 = match.date.getTime() + 2 * 60 * 60 * 1000;

      if (start1 > end2 || end1 < start2) continue;

      return res.status(400).send({
        error: 'can not reserve, match conflicts with another reserved one.',
      });
    }

    const result = await Reservation.createReservation(req.body);

    res.json({ ticket_id: result.id });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};
const getCustomerInfo = async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params.user_id);
    if (user_id != req.user) {
      res
        .status(403)
        .json({ error: 'Invalid credentials user can only view his data' });
      return;
    }
    const userInfo = (await User.getUserById(user_id)) as user;
    // increase the birth date by one day to fix the date issue
    userInfo.birth_date.setDate(userInfo.birth_date.getDate() + 1);
    const birth_date = userInfo.birth_date.toISOString().split('T')[0];
    res.status(200).json({
      id: userInfo.id,
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      gender: userInfo.gender,
      nationality: userInfo.nationality,
      birth_date: birth_date,
    });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

const updateCustomerInfo = async (req: Request, res: Response) => {
  try {
    const valid = validateUpdateUserData(req.body);
    if (valid.error) {
      res.status(400).json({ error: valid.error.details[0].message });
      return;
    }
    const user_id = Number(req.params.user_id);
    if (user_id != req.user) {
      res.status(403).json({
        error: 'Invalid credentials user can only update his own data',
      });
      return;
    }
    const userInfo = await User.getUserById(user_id);
    const updatedInfo = req.body as user;
    // if userInfo has password then it we hash it
    if (updatedInfo.password) {
      updatedInfo.password = hashPassword(updatedInfo.password);
    }
    const updatedUser: user = { ...userInfo, ...updatedInfo };
    const result = await User.updateUser(updatedUser);
    result.birth_date.setDate(result.birth_date.getDate() + 1);
    const birth_date = result.birth_date.toISOString().split('T')[0];
    res.status(200).json({
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
      gender: result.gender,
      nationality: result.nationality,
      birth_date: birth_date,
    });
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

export {
  getUserTickets,
  deleteTicket,
  getReservedSeats,
  reserveTicket,
  getCustomerInfo,
  updateCustomerInfo,
};
