import pool from '../db/connection';

class OfficeController {
  static async createoffice(req, res, next) {

    try {
      const { name, type } = req.body;
      const sql = 'SELECT * FROM offices WHERE name = $1';
      const val = [name];

      const officeFound = await pool.query(sql, val);

      const { rowCount } = officeFound;

      if (rowCount > 0) {
        res.status(409).json({
          status: 409,
          error: 'This office has been created already',
        });
      } else {
        const query = 'INSERT INTO offices(name, type) VALUES($1, $2) RETURNING *';
        const values = [name, type];

        const result = await pool.query(query, values);
        const { rows } = result;
        if (result.rowCount) {
          return res.status(201).json({
            status: 201,
            data: [{
              id: rows[0].id,
              name: rows[0].name,
              type: rows[0].type,
            }],
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong while processing your request',
      });
    }
  }

  static async getAllOffices(req, res, next) {

    const query = 'SELECT * FROM offices';

    try {
      const result = await pool.query(query);
      const { rowCount, rows } = result;

      res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong while processing your request',
      });
    }
  }

  static async getOneOffice(req, res, next) {

    const id = parseInt(req.params.id, 10);
    const query = 'SELECT * FROM offices WHERE id = $1';
    const values = [id];

    try {
      const result = await pool.query(query, values);
      const { rowCount, rows } = result;
      if (rowCount <= 0) {
        const error = new Error('No office with such id');
        error.status = 404;
        return next(error);
      }
      res.status(200).json({
        status: 200,
        data: [{
          id: rows[0].id,
          type: rows[0].type,
          name: rows[0].name,
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong while processing your request',
      });
    }
  }

  static async getResult(req, res, next) {

    try {
      const { id } = req.params;
      const query = 'SELECT candidate, office, COUNT(candidate) AS result FROM votes WHERE office = $1 GROUP BY office, candidate';
      const values = [id];

      const result = await pool.query(query, values);
      const { rows, rowCount } = result;
      if (rowCount <= 0) {
        const error = new Error('No office with such id');
        error.status = 404;
        return next(error);
      }
      res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Something went wrong while processing your request' });
    }
  }
}

export default OfficeController;
