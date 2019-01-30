import express from 'express';
import homeRoute from './homeRoute';
import partiesroute from './partiesRoute';

const router = express.Router();

router.use('/', homeRoute);
router.use('/parties', partiesroute);

export default router;
