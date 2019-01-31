import express from 'express';
import PartyController from '../controllers/PartyController';
import Validate from '../middleware/Validate';
import { uploadLogo } from '../middleware/imageUpload';

const router = express.Router();

router.post('/', uploadLogo, Validate.validateParty, PartyController.createParty);
router.get('/:id', Validate.validateId, PartyController.getOneParty);
router.get('/', PartyController.getAllParties);
router.patch('/:id/name', Validate.validateId, PartyController.updatePartyName);

export default router;
