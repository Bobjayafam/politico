import pool from './connection';
import user from './models/user';
import party from './models/party';
import candidate from './models/candidate';
import vote from './models/vote';
import office from './models/office';

const dropTables = 'DROP TABLE IF EXISTS users, parties, offices, candidates, votes CASCADE';

const migrate = async () => {
  const client = await pool.connect();
  try {
    await client.query(dropTables);
    await client.query(user.CREATE_TABLE);
    await client.query(office.CREATE_TABLE);
    await client.query(party.CREATE_TABLE);
    await client.query(candidate.CREATE_TABLE);
    await client.query(vote.CREATE_TABLE);
  } catch (error) {
    console.log(error);
  } finally {
    await client.release();
  }
};

migrate();
