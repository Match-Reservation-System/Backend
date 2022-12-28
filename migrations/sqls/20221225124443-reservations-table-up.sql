CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  match_id INTEGER NOT NULL,
  row INTEGER NOT NULL,
  seat INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (match_id) REFERENCES matches(id),
  UNIQUE(match_id, row, seat)
);