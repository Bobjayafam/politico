import dotenv from 'dotenv';

import pool from './connection';
import Helpers from '../helpers/Helpers';

dotenv.config();

const adminFirstname = process.env.ADMIN_FIRST_NAME;
const adminLastname = process.env.ADMIN_LAST_NAME;
const adminOthername = process.env.ADMIN_OTHER_NAME;
const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = Helpers.hashPassword(process.env.ADMIN_PASSWORD);
const adminPhoneNumber = process.env.ADMIN_PHONE_NUMBER;
const isAdmin = process.env.IS_ADMIN;
const adminPassportUrl = process.env.ADMIN_PASSPORT_URL;

const adminData = [adminFirstname, adminLastname, adminOthername, adminEmail, adminPassword, adminPhoneNumber, isAdmin, adminPassportUrl];
const userQuery = 'INSERT INTO users(first_name, last_name, other_name, email, password, phone_number, is_admin, passport_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';

const user1 = ['Stanley', 'Obi', 'Abanum', 'stapolly@yahoo.com', Helpers.hashPassword('123456'), '08025862169', false, 'https://res.cloudinary.com/dpuyyqxnl/image/upload/v1549078659/nhqytbpoh9h5ldqpeeed.jpg'];

const user2 = ['George', 'Ugboma', 'Azikiwe', 'georgeeano@yahoo.com', Helpers.hashPassword('123456'), '08034795933', false, 'https://res.cloudinary.com/dpuyyqxnl/image/upload/v1549078659/nhqytbpoh9h5ldqpeeed.jpg'];

const party1 = ['Peoples democratic party', '12 Ozumba mbadiwe street, lagos', 'https://res.cloudinary.com/dpuyyqxnl/image/upload/v1549078659/nhqytbpoh9h5ldqpeeed.jpg', 'PDP'];

const party2 = ['All progressives congress', '12 Ozumba mbadiwe street, lagos', 'https://res.cloudinary.com/dpuyyqxnl/image/upload/v1549078659/nhqytbpoh9h5ldqpeeed.jpg', 'APC'];

const party3 = ['All progressive grand alliance', '12 Ozumba mbadiwe street, lagos', 'https://res.cloudinary.com/dpuyyqxnl/image/upload/v1549078659/nhqytbpoh9h5ldqpeeed.jpg', 'APGA'];

const office1 = ['senate', 'legislative'];
const office2 = ['governor', 'state'];
const office3 = ['councillor', 'local government'];

const officeQuery = 'INSERT INTO offices(name, type) VALUES ($1, $2)';
const partyQuery = 'INSERT INTO parties(name, hq_address, logo_url, acronym) VALUES ($1, $2, $3, $4)';

const seed = async () => {
  const client = await pool.connect();
  try {
    await client.query(userQuery, adminData);
    await client.query(userQuery, user1);
    await client.query(userQuery, user2);
    await client.query(officeQuery, office1);
    await client.query(officeQuery, office2);
    await client.query(officeQuery, office3);
    await client.query(partyQuery, party1);
    await client.query(partyQuery, party2);
    await client.query(partyQuery, party3);
  } catch (error) {
    console.log(error);
  } finally {
    await client.release();
  }
};

seed();
