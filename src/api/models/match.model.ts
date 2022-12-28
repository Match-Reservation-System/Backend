import client from '../../config/db/db';
import { match } from '../types/models/match';

class Match {
  static async createMatch(match: match): Promise<match> {
    try {
      const sql =
        'INSERT INTO matches (stadium_id, date, home_team, away_team, main_referee, first_line_referee, second_line_referee, ticket_price) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id,role';
      const result = await client.query(sql, [
        match.stadium_id,
        match.date,
        match.home_team,
        match.away_team,
        match.main_referee,
        match.first_line_referee,
        match.second_line_referee,
        match.ticket_price
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new match. Error: ${err}`);
    }
  }

  static async getMatchById(
    match_id: number
  ): Promise<match | null> {
    try {
      const sql = 'select * FROM matches WHERE id = $1';
      const result = await client.query(sql, [match_id]);
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not get the match with id ${match_id}. Error: ${err}`
      );
    }
  }

  static async getUserReservedMatches(
    user_id: number
  ): Promise<match[] | null> {
    try {
      const sql = 'select matches.id, matches.date FROM matches, reservations WHERE reservations.match_id =  matches.id and reservations.user_id = $1';
      const result = await client.query(sql, [user_id]);
      return result.rows;
    } catch (err) {
      throw new Error(
        `Could not get dates of the user with id ${user_id}. Error: ${err}`
      );
    }
  }

}

export default Match;
