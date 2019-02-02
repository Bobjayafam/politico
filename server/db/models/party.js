export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS parties 
    (
      id SERIAL PRIMARY KEY,
      name VARCHAR UNIQUE NOT NULL,
      hq_address VARCHAR NOT NULL,
      logo_url VARCHAR,
      acronym VARCHAR UNIQUE NOT NULL
    )
  `,
};
