export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS votes 
    (
      id SERIAL UNIQUE NOT NULL,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      created_by INTEGER REFERENCES users (id) ON DELETE CASCADE,
      office INTEGER REFERENCES offices (id) ON DELETE CASCADE,
      candidate INTEGER REFERENCES candidates (id) ON DELETE CASCADE,
      PRIMARY KEY (created_by, office)
    )
  `,
};
