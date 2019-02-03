import express from 'express';
import VoteController from '../controllers/VoteController';
import Validate from '../middleware/Validate';


const router = express.Router();

router.post('/', Validate.validateVote, VoteController.vote);

export default router;
