import client from '../../config/db/db';
import { reservation } from '../../types/models/reservation';
import ticketsRouter from '../routes/tickets.route';

class Reservation {

  static async getReservationsByUserId(user_id: number): Promise<reservation[] | null> { try {
      const sql = 'SELECT * FROM reservations WHERE user_id = $1';
      const result = await client.query(sql, [user_id]);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get reservations for user_id ${user_id}. Error: ${err}`);
    }
  }

  static async getReservationsByMatchId(match_id: number): Promise<reservation[] | null> { try {
      const sql = 'SELECT * FROM reservations WHERE match_id = $1';
      const result = await client.query(sql, [match_id]);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get reservations for match_id ${match_id}. Error: ${err}`);
    }
  }

  static async getReservationById(ticket_id: number): Promise<reservation | null> {
    try {
      const sql = 'select * FROM reservations WHERE id = $1';
      const result = await client.query(sql, [ticket_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete the reservation with id ${ticket_id}. Error: ${err}`);
    }
  }

  static async deleteReservationByID(ticket_id: number) {
    try {
      const sql = 'DELETE FROM reservations WHERE id = $1';
      const result = await client.query(sql, [ticket_id]);
    } catch (err) {
      throw new Error(`Could not delete the reservation with id ${ticket_id}. Error: ${err}`);
    }
  }

  static async createReservation(reservation: reservation) {
    try {
      const sql =
        'INSERT INTO reservations (match_id, row, seat, user_id) VALUES($1, $2, $3, $4)';
      const result = await client.query(sql, [
        reservation.match_id,
        reservation.row,
        reservation.seat,
        reservation.user_id,
      ]);
    } catch (err) {
      throw new Error(`Could not add new reservation. Error: ${err}`);
    }
  }
}

export default Reservation;
