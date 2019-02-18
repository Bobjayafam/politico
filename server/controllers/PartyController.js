
import { logoUrlUploaded } from '../middleware/imageUpload';
import pool from '../db/connection';

class PartyController {
  static async createParty(req, res) {
    const client = await pool.connect();
    try {
      const {
        name, hqAddress, acronym,
      } = req.body;

      const sql = 'SELECT * FROM parties WHERE name = $1';
      const val = [name];

      const partyFound = await client.query(sql, val);

      const { rowCount } = partyFound;

      if (rowCount > 0) {
        res.status(409).json({
          status: 409,
          error: 'A party has already been created with this name',
        });
      } else {
        const sql = 'SELECT * FROM parties WHERE acronym = $1';
        const val = [acronym];

        const partyFound = await client.query(sql, val);

        const { rowCount } = partyFound;

        if (rowCount > 0) {
          res.status(409).json({
            status: 409,
            error: 'A party has already been created with this acronym',
          });
        } else {
          const query = 'INSERT INTO parties(name, hq_address, acronym, logo_url) VALUES($1, $2, $3, $4) RETURNING *';
          const values = [name, hqAddress, acronym, logoUrlUploaded];

          const result = await client.query(query, values);
          const { rows } = result;
          if (result.rowCount) {
            return res.status(201).json({
              status: 201,
              data: [{
                id: rows[0].id,
                name: rows[0].name,
              }],
            });
          }
        }
      }
    } catch (error) {
      res.status(500).jso({
        status: 500,
        error: 'Something went wrong while processing your request',
      });
    } finally {
      await client.release();
    }
  }

  static async getOneParty(req, res, next) {
    const client = await pool.connect();
    const id = parseInt(req.params.id, 10);
    const query = 'SELECT * FROM parties WHERE id = $1';
    const values = [id];

    try {
      const result = await client.query(query, values);
      const { rowCount, rows } = result;
      if (rowCount <= 0) {
        const error = new Error('No party with such id');
        error.status = 404;
        return next(error);
      }
      res.status(200).json({
        status: 200,
        data: [{
          id: rows[0].id,
          name: rows[0].name,
          logoUrl: rows[0].logo_url,
          acronym: rows[0].acronym,
        }],
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Something went wrong while processing your request' });
    } finally {
      await client.release();
    }
  }

  static async getAllParties(req, res) {
    const client = await pool.connect();
    const query = 'SELECT * FROM parties';

    try {
      const result = await client.query(query);
      const { rowCount, rows } = result;
      res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Something went wrong while processing your request' });
    } finally {
      await client.release();
    }
  }

  static async updatePartyName(req, res, next) {
    const client = await pool.connect();
    try {
      const id = parseInt(req.params.id, 10);
      const { name } = req.body;

      const query = 'UPDATE parties SET name = $1 WHERE id = $2 RETURNING *';
      const values = [name, id];

      const result = await client.query(query, values);
      const { rowCount, rows } = result;
      if (rowCount <= 0) {
        const error = new Error('No party with such id');
        error.status = 404;
        return next(error);
      }
      res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Something went wrong while processing your request' });
    } finally {
      await client.release();
    }
  }

  static async deleteParty(req, res, next) {
    const client = await pool.connect();
    try {
      const id = parseInt(req.params.id, 10);
      const query = 'DELETE FROM parties WHERE id = $1 RETURNING *';
      const values = [id];

      const result = await client.query(query, values);

      const { rowCount, rows } = result;
      if (rowCount <= 0) {
        const error = new Error('No party with such id');
        error.status = 404;
        return next(error);
      }
      res.status(200).json({
        status: 200,
        data: [{
          message: `You successfully deleted ${rows[0].name} party`,
        }],
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Something went wrong while processing your request' });
    } finally {
      await client.release();
    }
  }
}

export default PartyController;
