import express from 'express';
import OfficeController from '../controllers/OfficeController';
import Validate from '../middleware/Validate';

const router = express.Router();

router.post('/', Validate.validateOffice, OfficeController.createoffice);


export default router;
