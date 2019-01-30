import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: [
      {
        message: 'Welcome to politico API version 1',
      },
    ],
  });
});

export default router;
