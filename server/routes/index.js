import express from 'express';
import PartyController from '../controllers/PartyController';
import Validate from '../middleware/Validate';
import { uploadLogo } from '../middleware/imageUpload';

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

router.post('/parties', uploadLogo, Validate.validateParty, PartyController.createParty);

export default router;
