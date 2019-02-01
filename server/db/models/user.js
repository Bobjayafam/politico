export default {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS users
    (
      id SERIAL PRIMARY KEY,
      first_name VARCHAR NOT NULL,
      last_name VARCHAR NOT NULL,
      other_name VARCHAR,
      email VARCHAR UNIQUE NOT NULL,
      password VARCHAR NOT NULL,
      phone_number VARCHAR,
      is_admin BOOLEAN NOT NULL DEFAULT FALSE,
      passport_url VARCHAR NOT NULL
    )
  `,
};
