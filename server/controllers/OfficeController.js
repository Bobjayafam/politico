import pool from '../db/connection';

class OfficeController {
  static async createoffice(req, res, next) {
    const client = await pool.connect();
    try {
      const { name, type } = req.body;

      const sql = 'SELECT * FROM offices WHERE name = $1';

      const officeFound = await client.query(sql);

      const { rowCount } = officeFound;

      if (rowCount > 0) {
        res.status(409).json({
          status: 409,
          error: 'This office has been created already',
        });
      } else {
        const query = 'INSERT INTO offices(name, type) VALUES($1, $2) RETURNING *';
        const values = [name, type];

        const result = await client.query(query, values);
        const { rows } = result;
        if (result.rowCount) {
          return res.status(201).json({
            status: 200,
            data: [{
              id: rows[0].id,
              name: rows[0].name,
              type: rows[0].type,
            }],
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Something went wrong while processing your request',
      });
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
      res.status(500).json({
        status: 500,
        error: 'Something went wrong while processing your request',
      });
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
          type: rows[0].type,
          name: rows[0].name,
        }],
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: 'Something went wrong while processing your request',
      });
    } finally {
      await client.release();
    }
  }

  static async registerCandidate(req, res, next) {
    const client = await pool.connect();
    try {
      const id = parseInt(req.params.id, 10);
      const { office, party } = req.body;

      const sql = 'SELECT * FROM users WHERE id = $1';
      const val = [id];

      const userFound = await client.query(sql, val);
      const { rowCount } = userFound;
      if (rowCount <= 0) {
        res.status(404).json({
          status: 404,
          error: 'No user with such id',
        });
      } else {
        const sql = 'SELECT * FROM offices WHERE id = $1';
        const val = [office];

        const officeFound = await client.query(sql, val);
        const { rowCount } = officeFound;
        if (rowCount <= 0) {
          res.status(404).json({
            status: 404,
            error: 'No office with such id',
          });
        } else {
          const sql = 'SELECT * FROM parties WHERE id = $1';
          const val = [party];

          const partyFound = await client.query(sql, val);
          const { rowCount } = partyFound;
          if (rowCount <= 0) {
            res.status(404).json({
              status: 404,
              error: 'No party with such id',
            });
          } else {
            const sql = 'SELECT * FROM candidates WHERE office = $1 AND candidate =$2';
            const val = [office, id];
            const registered = await client.query(sql, val);

            const { rowCount } = registered;

            if (rowCount > 0) {
              res.status(409).json({
                status: 409,
                error: 'The candidate has already been registered for this office',
              });
            } else {
              const query = 'INSERT INTO candidates(office, party, candidate) VALUES($1, $2, $3) RETURNING *';
              const values = [office, party, id];
              const result = await client.query(query, values);
              const { rowCount, rows } = result;

              if (rowCount > 0) {
                return res.status(201).json({
                  status: 201,
                  data: [
                    {
                      office: rows[0].office,
                      user: rows[0].candidate,
                    },
                  ],
                });
              }
            }
          }
        }
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Something went wrong while processing your request',
      });
    } finally {
      await client.release();
    }
  }

  static async getResult(req, res, next) {
    const client = await pool.connect();

    try {
      const { id } = req.params;
      const query = 'SELECT candidate, office, COUNT(candidate) AS result FROM votes WHERE office = $1 GROUP BY office, candidate';
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
      return res.status(500).json({ status: 500, error: 'Something went wrong while processing your request' });
    } finally {
      await client.release();
    }
  }
}

export default OfficeController;
