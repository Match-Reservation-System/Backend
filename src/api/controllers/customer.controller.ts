import { Request, Response } from 'express';
import Reservation from '../models/reservation.model';

const getUserTickets = async (req: Request, res: Response) => {
  try {
    //TODO: check for auth user 
    const user_id = Number(req.params.user_id);
    const tickets = await Reservation.getReservationsByUserId(user_id);
    res.json({tickets: tickets})
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

const deleteTicket = async (req: Request, res: Response) => {
  try {
    const ticket_id = Number(req.params.ticket_id);
    const ticket = await Reservation.getReservationById(ticket_id);
    //TODO: check for auth user 
    if (!ticket)
      return res.status(404).send({ err: 'Tickets not found or does not belong to this user.'});

    //TODO: check for match starts after 3 days
    await Reservation.deleteReservationByID(ticket_id);

    res.json(`Deleted ticket with id ${ticket_id}`);
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};
//TODO: change name to getReservedSeats
const getMatchTickets = async (req: Request, res: Response) => {
  try {
    const match_id = Number(req.params.match_id);
    const tickets = await Reservation.getReservationsByMatchId(match_id);
    res.json({tickets: tickets})
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

const reserveTicket = async (req: Request, res: Response) => {
  try {
    //TODO: add validations
    //TODO: check for auth user 
    req.body.user_id = 1;
    const result = await Reservation.createReservation(req.body);
    //TODO: check if in the boundaries of the stadium
    //TODO: check if the seat is not reserved already (can be skipped but message will be a db generated message)
    //TODO: check if he did not reserve a ticket for a match with conflict time
    //TODO: we might add stripe payment here 
    res.json({ticket_id: result.id});
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

export { getUserTickets, deleteTicket, getMatchTickets, reserveTicket };
