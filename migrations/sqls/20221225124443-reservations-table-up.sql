CREATE TABLE IF NOT EXISTS reservations (
  match_id INTEGER NOT NULL,
  row INTEGER NOT NULL,
  seat INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (match_id) REFERENCES matches(id),
  PRIMARY KEY  (match_id, row, seat)
);