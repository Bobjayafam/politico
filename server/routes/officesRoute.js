import express from 'express';
import OfficeController from '../controllers/OfficeController';
import CandidateController from '../controllers/CandidateController';
import Validate from '../middleware/Validate';
import Auth from '../middleware/Auth';

const router = express.Router();

router.post('/', Auth.isLoggedIn, Auth.checkAdmin, Validate.validateOffice, OfficeController.createoffice);
router.get('/', Auth.isLoggedIn, OfficeController.getAllOffices);
router.get('/:id', Auth.isLoggedIn, Validate.validateId, OfficeController.getOneOffice);
router.patch('/:id/register', Auth.isLoggedIn, Auth.checkAdmin, Validate.validateId, CandidateController.registerCandidate);
router.get('/:id/result', Auth.isLoggedIn, Validate.validateId, OfficeController.getResult);
router.post('/:id/contest', Auth.isLoggedIn, Validate.validateId, CandidateController.showInterest);

export default router;
