import express from 'express';
import homeRoute from './homeRoute';
import partiesRoute from './partiesRoute';
import officesRoute from './officesRoute';

const router = express.Router();

router.use('/', homeRoute);
router.use('/parties', partiesRoute);
router.use('/offices', officesRoute);

export default router;
