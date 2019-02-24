import pool from '../db/connection';

class VoteController {
  static async vote(req, res) {
    try {
      const voter = req.decoded.id;
      const { office, candidate } = req.body;

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
        const sql = 'SELECT * FROM candidates WHERE id = $1';
        const val = [candidate];

        const candidateFound = await pool.query(sql, val);
        const { rowCount } = candidateFound;
        if (rowCount <= 0) {
          res.status(404).json({
            status: 404,
            error: 'No candidate with such id',
          });
        } else {
          const sql = 'SELECT * FROM votes WHERE office = $1 AND candidate = $2';
          const val = [office, candidate];

          const voteFound = await pool.query(sql, val);

          const { rowCount } = voteFound;

          if (rowCount > 0) {
            res.status(409).json({
              status: 409,
              error: 'You have already voted for this candidate for this office',
            });
          } else {
            const query = 'INSERT INTO votes(created_by, office, candidate) VALUES($1, $2, $3) RETURNING *';
            const values = [voter, office, candidate];
            const result = await pool.query(query, values);
            const { rowCount, rows } = result;
            if (rowCount > 0) {
              return res.status(201).json({
                status: 201,
                data: rows,
              });
            }
          }
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong while processing your request',
      });
    }
  }
}

export default VoteController;
