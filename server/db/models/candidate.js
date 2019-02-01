export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS candidates
    (
      id SERIAL UNIQUE NOT NULL,
      office INTEGER REFERENCES offices (id) ON DELETE CASCADE,
      party INTEGER REFERENCES parties (id) ON DELETE CASCADE,
      candidate INTEGER REFERENCES users (id) ON DELETE CASCADE,
      PRIMARY KEY (office, candidate)
    )
  `,
};
