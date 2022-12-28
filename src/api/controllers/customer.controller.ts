import { Request, Response } from 'express';
import { copyFileSync } from 'fs';
import { nextTick } from 'process';
import Match from '../models/match.model';
import Reservation from '../models/reservation.model';
import { reservation } from '../types/models/reservation';
import validateReservationData from '../utils/validations/reserveTicketValidation';

const getUserTickets = async (req: Request, res: Response) => {
  try {
    const user_id = Number(req.params.user_id);
    
    if(user_id!=req.user) {
      res
        .status(401)
        .json({ error: 'Invalid credentials user is not authorized' });
      return;
    }

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
    if (!ticket || ticket.user_id!=req.user)
      return res.status(404).send({ err: 'Tickets not found or does not belong to this user.'});
    
    const match = await Match.getMatchById(ticket.match_id);
    if(match==null)
      return res.status(404).send({ err: 'Match not found.'});
    
    const days_before_match = (match.date.getTime() - Date.now()) / (1000*3600*24)
    console.log(days_before_match);

    if(days_before_match < 3)
      return res.status(400).send({ err: 'Can not cancel, match starts in less than 3 days.'});

    await Reservation.deleteReservationByID(ticket_id);

    res.json({message: `successfully deleted ticket with id ${ticket_id}.`});

  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

const getReservedSeats = async (req: Request, res: Response) => {
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
    const { error } = validateReservationData(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    req.body.user_id = req.user;

    //TODO: check if in the boundaries of the stadium
    //TODO: check if the seat is not reserved already (can be skipped but message will be a db generated message)
    //TODO: we might add stripe payment here 

    //check if he did not reserve a ticket for a match with conflict time
    const match = await Match.getMatchById(req.body.match_id);
    if(match==null)
      return res.status(404).send({ err: 'Match not found.'});

    const dates = await Match.getUserReservedMatches(Number(req.user));
    for(let i in dates)
    {
      const id = dates[Number(i)]['id'];
      if(id==match.id)
        continue;
        
      const date = dates[Number(i)]['date'];
      const start1 = date.getTime(), end1 = date.getTime() + 2 * 60 * 60 * 1000;
      const start2 = match.date.getTime(), end2 = match.date.getTime() + 2 * 60 * 60 * 1000;

      if(start1>end2 || end1<start2)
        continue;

      return res.status(400).send({ err: 'can not reserve, match conflicts with another reserved one.'});
    }

    const result = await Reservation.createReservation(req.body);

    res.json({ticket_id: result.id});
  } catch (err: unknown) {
    const typedError = err as Error;
    res.status(401).json({ error: typedError?.message });
  }
};

export { getUserTickets, deleteTicket, getReservedSeats, reserveTicket };
