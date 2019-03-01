import pool from '../db/connection';

class CandidateController {
  static async showInterest(req, res, next) {
    try {
      const userId = parseInt(req.decoded.id, 10);
      const { party, office } = req.body;
      const sql = 'SELECT * FROM offices WHERE id = $1';
      const val = [office];

      const officeFound = await pool.query(sql, val);
      const { rowCount } = officeFound;
      if (rowCount <= 0) {
        res.status(404).json({
          status: 404,
          error: 'No office with such id',
        });
      } else {
        const sql = 'SELECT * FROM parties WHERE id = $1';
        const val = [party];

        const partyFound = await pool.query(sql, val);
        const { rowCount } = partyFound;
        if (rowCount <= 0) {
          res.status(404).json({
            status: 404,
            error: 'No party with such id',
          });
        } else {
          const sql = 'SELECT * FROM candidates WHERE office = $1 AND candidate =$2';
          const val = [office, userId];
          const registered = await pool.query(sql, val);

          const { rowCount } = registered;

          if (rowCount > 0) {
            res.status(409).json({
              status: 409,
              error: 'The candidate has already expressed an interest for this office',
            });
          } else {
            const query = 'INSERT INTO candidates(office, party, candidate) VALUES($1, $2, $3) RETURNING *';
            const values = [office, party, userId];
            const result = await pool.query(query, values);
            const { rowCount, rows } = result;

            if (rowCount > 0) {
              return res.status(201).json({
                status: 201,
                data: [
                  {
                    office: rows[0].office,
                    user: rows[0].candidate,
                    party: rows[0].party,
                    status: rows[0].current_status,
                  },
                ],
              });
            }
          }
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }

  static async registerCandidate(req, res, next) {
    try {
      const id = parseInt(req.params.id, 10);
      const { status } = req.body;

      const query = 'UPDATE candidates SET current_status = $1 WHERE id = $2 RETURNING *';
      const values = [status, id];

      const result = await pool.query(query, values);
      const { rowCount, rows } = result;
      if (rowCount <= 0) {
        const error = new Error('No prospective candidate with such id');
        error.status = 404;
        return next(error);
      }
      return res.status(200).json({
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

  static async getAllInterestedCandidates(req, res, next) {
    try {
      const sql = `SELECT c.id, current_status, o.name AS office_name, p.name AS party_name, u.first_name, u.last_name FROM candidates c
       JOIN offices o ON c.office = o.id 
       JOIN parties p ON c.party = p.id 
       JOIN users u ON c.candidate = u.id`;

      const result = await pool.query(sql);
      const { rows } = result;
      return res.status(200).json({
        status: 200,
        data: rows,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}

export default CandidateController;
