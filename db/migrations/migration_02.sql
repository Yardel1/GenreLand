

DROP TABLE events;

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  event_date VARCHAR(255) NOT NULL,
  event_time VARCHAR(255),
  genre TEXT NOT NULL,
  description TEXT NOT NULL,
  createdby INTEGER NOT NULL,
  zip_code INTEGER
);