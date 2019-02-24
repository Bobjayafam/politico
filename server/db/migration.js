import pool from './connection';
import user from './models/user';
import party from './models/party';
import candidate from './models/candidate';
import vote from './models/vote';
import office from './models/office';

const dropTables = 'DROP TABLE IF EXISTS users, parties, offices, prospective_candidates, candidates, votes CASCADE';
const dropTypes = 'DROP TYPE IF EXISTS status';

const migrate = async () => {
  try {
    await pool.query(dropTables);
    await pool.query(dropTypes);
    await pool.query(user.CREATE_TABLE);
    await pool.query(office.CREATE_TABLE);
    await pool.query(party.CREATE_TABLE);
    await pool.query(candidate.CREATE_TYPE);
    await pool.query(candidate.CREATE_TABLE);
    await pool.query(vote.CREATE_TABLE);
  } catch (error) {
    console.log(error);
  }
};

migrate();
