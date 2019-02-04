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

  static async getAllOffices(req, res, next) {
    const client = await pool.connect();
    const query = 'SELECT * FROM offices';

    try {
      const result = await client.query(query);
      const { rowCount, rows } = result;
      if (rowCount <= 0) {
        res.status(200).json({
          status: 200,
          data: [],
        });
        return;
      }
      res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    } finally {
      await client.release();
    }
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

  static async registerCandidate(req, res, next) {
    const client = await pool.connect();
    try {
      const id = parseInt(req.params.id, 10);
      const { office, party } = req.body;
      const query = 'INSERT INTO candidates(office, party, candidate) VALUES($1, $2, $3) RETURNING *';
      const values = [office, party, id];
      const result = await client.query(query, values);
      const { rowCount, rows } = result;
      if (rowCount > 0) {
        res.status(200).json({
          status: 200,
          data: rows,
        });
        return;
      }
    } catch (error) {
      const { constraint } = error;
      if (constraint === 'candidates_pkey') {
        res.status(409).json({ status: 409, error: 'The user has already been registered for this office' });
        return;
      }
      if (constraint === 'candidates_office_fkey') {
        res.status(404).json({ status: 404, error: 'The office is not available' });
        return;
      }
      if (constraint === 'candidates_party_fkey') {
        res.status(404).json({ status: 404, error: 'the party does not exist' });
        return;
      }
      if (constraint === 'candidates_candidate_fkey') {
        res.status(404).json({ status: 404, error: 'User not found' });
        return;
      }
      res.status(500).json({ status: 500, error: error.message });
    } finally {
      await client.release();
    }
  }

  static async getResult(req, res, next) {
    const client = await pool.connect();

    try {
      const { id } = req.params;
      const query = 'SELECT candidate, office, COUNT(candidate) AS total_votes FROM votes WHERE office = $1 GROUP BY office, candidate';
      const values = [id];

      const result = await client.query(query, values);
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
      return res.status(500).json({ status: 500, error: error.message });
    } finally {
      await client.release();
    }
  }
}

export default OfficeController;
