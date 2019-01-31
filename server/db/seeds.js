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

const seed = async () => {
  const client = await pool.connect();
  try {
    await client.query(
      `INSERT INTO users
        (first_name, last_name, other_name, email, password, phone_number, is_admin, passport_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `, adminData,
    );
  } catch (error) {
    console.log(error);
  } finally {
    await client.release();
  }
};

seed();
