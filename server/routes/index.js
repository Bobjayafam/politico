import express from 'express';
import homeRoute from './homeRoute';
import partiesRoute from './partiesRoute';
import officesRoute from './officesRoute';
import authRoute from './authRoute';
import voteRoute from './voteRoute';
import candidateRoute from './candidateRoute';

const router = express.Router();

router.use('/', homeRoute);
router.use('/parties', partiesRoute);
router.use('/offices', officesRoute);
router.use('/auth', authRoute);
router.use('/votes', voteRoute);
router.use('/candidates', candidateRoute);

export default router;
