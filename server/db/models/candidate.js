export default {
  CREATE_TYPE: 'CREATE TYPE status as ENUM(\'pending\', \'rejected\', \'registered\')',
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS candidates
    (
      id SERIAL UNIQUE NOT NULL,
      office INTEGER REFERENCES offices (id) ON DELETE CASCADE,
      party INTEGER REFERENCES parties (id) ON DELETE CASCADE,
      candidate INTEGER REFERENCES users (id) ON DELETE CASCADE,
      current_status status default 'pending',
      PRIMARY KEY (office, candidate)
    )
  `,
};
