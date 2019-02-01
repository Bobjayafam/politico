export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS offices 
    (
      id SERIAL PRIMARY KEY,
      name VARCHAR NOT NULL UNIQUE,
      type VARCHAR NOT NULL
    )
  `,
};
