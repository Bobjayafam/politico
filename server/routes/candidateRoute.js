import express from 'express';
import CandidateController from '../controllers/CandidateController';
import Validate from '../middleware/Validate';
import Auth from '../middleware/Auth';

const router = express.Router();

router.get('/', Auth.isLoggedIn, Auth.checkAdmin, CandidateController.getAllInterestedCandidates);

export default router;
