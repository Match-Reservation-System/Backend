import client from '../../config/db/db';
import stadium from '../types/models/stadium';

class Stadium {
  static async getStadiums(): Promise<stadium[] | null> {
    try {
      const sql = 'SELECT * FROM stadiums';
      const result = await client.query(sql);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get stadiums. ${err}`);
    }
  }
  static async createStadium(stadium: stadium): Promise<stadium> {
    try {
      const sql =
        'INSERT INTO stadiums (name,city,rows,seats_per_row) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await client.query(sql, [
        stadium.name,
        stadium.city,
        stadium.rows,
        stadium.seats_per_row,
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add new stadium ${stadium.name}. ${err}`);
    }
  }
  static async getStadiumByNameAndCity(
    name: string,
    city: string
  ): Promise<stadium | null> {
    try {
      const sql = 'SELECT * FROM stadiums WHERE name = $1 AND city = $2';
      const result = await client.query(sql, [name, city]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get stadium ${name} in ${city}. ${err}`);
    }
  }
  static async getStadiumById(stadium_id: number): Promise<stadium | null> {
    try{
      const sql = 'SELECT * FROM stadiums WHERE id = $1';
      const result = await client.query(sql, [stadium_id]);
      return result.rows[0];
    }catch(err){
      throw new Error(`Could not get stadium with id ${stadium_id}. ${err}`);
    }
  }
}

export default Stadium;
