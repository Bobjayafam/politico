import pool from '../db/connection';

class VoteController {
  static async vote(req, res) {
    const client = await pool.connect();
    try {
      const { voter, office, candidate } = req.body;
      const query = 'INSERT INTO votes(created_by, office, candidate) VALUES($1, $2, $3)';
      const values = [voter, office, candidate];
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
      if (constraint === 'votes_pkey') {
        res.status(409).json({ status: 409, error: 'You have already voted for this candidate' });
        return;
      }
      if (constraint === 'votes_office_fkey') {
        res.status(404).json({ status: 404, error: 'The office is not available' });
        return;
      }
      if (constraint === 'votes_party_fkey') {
        res.status(404).json({ status: 404, error: 'the party does not exist' });
        return;
      }
      if (constraint === 'votes_candidate_fkey') {
        res.status(404).json({ status: 404, error: 'User not found' });
        return;
      }
      res.status(500).json({ status: 500, error: error.message });
    } finally {
      await client.release();
    }
  }
}

export default VoteController;
