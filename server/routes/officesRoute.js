import express from 'express';
import OfficeController from '../controllers/OfficeController';

const router = express.Router();

router.get('/', OfficeController.getAllOffices);

export default router;
