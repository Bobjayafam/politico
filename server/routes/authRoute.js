import express from 'express';

import UserController from '../controllers/UserController';

import Validate from '../middleware/Validate';

const router = express.Router();

router.post('/signup', Validate.validateUser, UserController.createUser);


export default router;
