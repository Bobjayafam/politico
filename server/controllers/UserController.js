import pool from '../db/connection';
import Helpers from '../helpers/Helpers';

class UserController {
  static async createUser(req, res) {
    try {
      const {
        firstname, lastname, othername, email, password, phoneNumber, passportUrl,
      } = req.body;

      const sql = 'SELECT * FROM users WHERE email = $1';
      const val = [email];

      const userFound = await pool.query(sql, val);

      const { rowCount } = userFound;

      if (rowCount > 0) {
        res.status(409).json({
          status: 409,
          error: 'Email is already registered',
        });
      } else {
        const hashedPassword = Helpers.hashPassword(password);

        const query = 'INSERT INTO users(first_name, last_name, other_name, email, password, phone_number, passport_url) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [firstname, lastname, othername, email, hashedPassword, phoneNumber, passportUrl];

        const user = await pool.query(query, values);
        const { rows } = user;

        if (rows) {
          const user = rows[0];
          const payload = {
            id: user.id,
            isAdmin: user.is_admin,
          };
          const token = Helpers.generateToken({ payload });

          res.status(201).json({
            status: 201,
            data: [{
              token,
              user: {
                firstName: user.first_name,
                isAdmin: user.is_admin,
              },
            }],
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong with your request',
      });
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
      const result = await pool.query(query, values);
      if (result.rowCount <= 0) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid Username/Password',
        });
      }
      const userFound = result.rows[0];
      if (!Helpers.comparePassword(password, userFound.password)) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid Username/Password',
        });
      }
      const payload = {
        id: userFound.id,
        isAdmin: userFound.is_admin,
      };
      const token = Helpers.generateToken(payload);
      // eslint-disable-next-line consistent-return
      return res.status(200).json({
        status: 200,
        data: [{
          token,
          user: {
            firstname: userFound.first_name,
            isAdmin: userFound.is_admin,
          },
        }],
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }
}


export default UserController;
