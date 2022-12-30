import client from '../../config/db/db';
import { reservation } from '../types/models/reservation';

class Reservation {
  static async getReservationsByUserId(
    user_id: number
  ): Promise<reservation[] | null> {
    try {
      const sql =
        'SELECT user_id, r.id as ticket_id, row, seat, match_id, stadium_id, date, home_team, away_team, main_referee, first_line_referee, second_line_referee, ticket_price  FROM matches as m, reservations as r WHERE user_id = $1 AND m.id = r.match_id';
      const result = await client.query(sql, [user_id]);
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get reservations for user_id ${user_id}.  ${err}`
      );
    }
  }

  static async getReservationsByMatchId(
    match_id: number
  ): Promise<reservation[]> {
    try {
      const sql =
        'SELECT row, seat FROM matches as m, reservations as r WHERE match_id = $1 AND m.id = r.match_id';
      const result = await client.query(sql, [match_id]);
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get reservations for match_id ${match_id}.  ${err}`
      );
    }
  }

  static async getReservationById(
    ticket_id: number
  ): Promise<reservation | null> {
    try {
      const sql = 'select * FROM reservations WHERE id = $1';
      const result = await client.query(sql, [ticket_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get the reservation with id ${ticket_id}.  ${err}`
      );
    }
  }

  static async deleteReservationByID(ticket_id: number) {
    //TODO: return the deleted reservation
    try {
      const sql = 'DELETE FROM reservations WHERE id = $1';
      const result = await client.query(sql, [ticket_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete the reservation with id ${ticket_id}.  ${err}`
      );
    }
  }

  static async createReservation(reservation: reservation) {
    try {
      const sql =
        'INSERT INTO reservations (match_id, row, seat, user_id) VALUES($1, $2, $3, $4) RETURNING id';
      const result = await client.query(sql, [
        reservation.match_id,
        reservation.row,
        reservation.seat,
        reservation.user_id,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new reservation. ${err}`);
    }
  }
}

export default Reservation;
