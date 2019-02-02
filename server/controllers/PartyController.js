import parties from '../models/parties';
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

  static getOneParty(req, res, next) {
    const id = parseInt(req.params.id, 10);

    const partyFound = parties.filter(party => party.id === id)[0];
    if (partyFound) {
      return res.status(200).json({
        status: 200,
        data: [partyFound],
      });
    }
    const error = new Error('No party with such id');
    error.status = 404;
    return next(error);
  }

  static getAllParties(req, res) {
    res.status(200).json({
      status: 200,
      data: [...parties],
    });
  }

  static updatePartyName(req, res, next) {
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    let partyIndex;

    parties.filter((party, index) => {
      if (party.id === id) {
        partyIndex = index;
      }
    });

    if (partyIndex === undefined) {
      const error = new Error('No party with such id');
      error.status = 404;
      return next(error);
    }

    parties[partyIndex].name = name;
    return res.status(200).json({
      status: 200,
      data: [{ message: 'successfully updated' }],
    });
  }

  static deleteParty(req, res, next) {
    const id = parseInt(req.params.id, 10);
    let partyIndex;

    const partyFound = parties.filter((party, index) => {
      if (party.id === id) {
        partyIndex = index;
      }
    });
    if (partyIndex === undefined) {
      const error = new Error('No party with such id');
      error.status = 404;
      return next(error);
    }
    parties.splice(partyIndex, 1);
    return res.status(200).json({
      status: 200,
      data: [{ message: 'successfully deleted' }],
    });
  }
}

export default PartyController;
