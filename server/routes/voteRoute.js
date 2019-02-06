import express from 'express';
import VoteController from '../controllers/VoteController';
import Validate from '../middleware/Validate';
import Auth from '../middleware/Auth';


const router = express.Router();

router.post('/', Auth.isLoggedIn, VoteController.vote);

export default router;
