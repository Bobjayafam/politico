import express from 'express';
import PartyController from '../controllers/PartyController';
import Validate from '../middleware/Validate';
import Auth from '../middleware/Auth';
import { uploadLogo } from '../middleware/imageUpload';

const router = express.Router();

router.post('/', Auth.isLoggedInAsAdmin, uploadLogo, Validate.validateParty, PartyController.createParty);
router.get('/:id', Auth.isLoggedIn, Validate.validateId, PartyController.getOneParty);
router.get('/', Auth.isLoggedIn, PartyController.getAllParties);
router.patch('/:id/name', Auth.isLoggedInAsAdmin, Validate.validateId, PartyController.updatePartyName);
router.delete('/:id', Auth.isLoggedInAsAdmin, Validate.validateId, PartyController.deleteParty);

export default router;
