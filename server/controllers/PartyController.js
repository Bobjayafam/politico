
import { logoUrlUploaded } from '../middleware/imageUpload';
import pool from '../db/connection';

class PartyController {
  static async createParty(req, res) {
    const client = await pool.connect();
    try {
      const {
        name, hqAddress, acronym,
      } = req.body;

      const query = 'INSERT INTO parties(name, hq_address, acronym, logo_url) VALUES($1, $2, $3, $4) RETURNING *';
      const values = [name, hqAddress, acronym, logoUrlUploaded];

      const result = await client.query(query, values);
      const { rows } = result;
      if (result.rowCount) {
        res.status(201).json({
          status: 200,
          data: [{
            id: rows[0].id,
            name: rows[0].name,
            hqAddress: rows[0].hq_address,
            acronym: rows[0].acronym,
            logoUrl: rows[0].logo_url,
          }],
        });
        return;
      }
    } catch (error) {
      const { constraint } = error;
      if (constraint === 'parties_name_key') {
        res.status(409).json({ status: 409, error: 'A party has been registered with this same name' });
        return;
      }
      if (constraint === 'parties_acronym_key') {
        res.status(409).json({ status: 409, error: 'A party has been registered with this same acronym' });
        return;
      }
      return res.status(500).json({ status: 500, error: error.message });
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
      return res.status(500).json({ status: 500, error: error.message });
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
      return res.status(500).json({ status: 500, error: error.message });
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
      return res.status(500).json({ status: 500, error: error.message });
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
      return res.status(500).json({ status: 500, error: error.message });
    } finally {
      await client.release();
    }
  }
}

export default PartyController;
