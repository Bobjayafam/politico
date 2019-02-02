import offices from '../models/offices';
import pool from '../db/connection';

class OfficeController {
  static async createoffice(req, res, next) {
    const client = await pool.connect();
    try {
      const { name, type } = req.body;

      const query = 'INSERT INTO offices(name, type) VALUES($1, $2) RETURNING *';
      const values = [name, type];

      const result = await client.query(query, values);
      const { rows } = result;
      if (result.rowCount) {
        res.status(201).json({
          status: 200,
          data: [{
            id: rows[0].id,
            name: rows[0].name,
            type: rows[0].type,
          }],
        });
        return;
      }
    } catch (error) {
      const { constraint } = error;
      if (constraint === 'offices_name_key') {
        res.status(409).json({ status: 409, error: 'This office has been created already' });
        return;
      }
      return res.status(500).json({ status: 500, error: error.message });
    } finally {
      await client.release();
    }
  }

  static getAllOffices(req, res, next) {
    res.status(200).json({
      status: 200,
      data: [...offices],
    });
  }

  static async getOneOffice(req, res, next) {
    const client = await pool.connect();
    const id = parseInt(req.params.id, 10);
    const query = 'SELECT * FROM offices WHERE id = $1';
    const values = [id];

    try {
      const result = await client.query(query, values);
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
          name: rows[0].name,
          type: rows[0].type,
        }],
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    } finally {
      await client.release();
    }
  }
}

export default OfficeController;
