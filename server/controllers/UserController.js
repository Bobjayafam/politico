import pool from '../db/connection';
import Helpers from '../helpers/Helpers';

class UserController {
  static async createUser(req, res) {
    const client = await pool.connect();
    try {
      const {
        firstname, lastname, othername, email, password, phoneNumber, passportUrl,
      } = req.body;

      const hashedPassword = Helpers.hashPassword(password);

      const query = 'INSERT INTO users(first_name, last_name, other_name, email, password, phone_number, passport_url) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const values = [firstname, lastname, othername, email, hashedPassword, phoneNumber, passportUrl];

      const user = await client.query(query, values);
      const { rows } = user;

      if (rows) {
        const user = rows[0];
        const token = Helpers.generateToken(rows[0].id);
        return res.status(201).json({
          status: 201,
          data: [{
            token,
            user: {
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              phoneNumber: user.phone_number,
              isAdmin: user.is_admin,
            },
          }],
        });
      }
    } catch (error) {
      const { constraint } = error;
      if (constraint === 'users_email_key') {
        return res.status(409).json({ status: 409, error: 'Email is already registered' });
      }
      return res.status(500).json({ status: 500, error: error.message });
    } finally {
      await client.release();
    }
  }
}


export default UserController;
