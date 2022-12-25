CREATE TABLE IF NOT EXISTS matches (
  id SERIAL PRIMARY KEY,
  stadium_id INTEGER NOT NULL REFERENCES stadiums(id),
  date TIMESTAMP NOT NULL,
  home_team VARCHAR(255) NOT NULL,
  away_team VARCHAR(255) NOT NULL,
  main_referee VARCHAR(255) NOT NULL,
  first_line_referee VARCHAR(255) NOT NULL,
  second_line_referee VARCHAR(255) NOT NULL,
  ticket_price INTEGER NOT NULL
);