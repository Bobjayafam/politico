import express from 'express';
import homeRoute from './homeRoute';
import partiesRoute from './partiesRoute';

const router = express.Router();

router.use('/', homeRoute);
router.use('/parties', partiesRoute);

export default router;
