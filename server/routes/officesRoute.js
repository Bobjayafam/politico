import express from 'express';
import OfficeController from '../controllers/OfficeController';
import Validate from '../middleware/Validate';

const router = express.Router();

router.post('/', Validate.validateOffice, OfficeController.createoffice);
router.get('/', OfficeController.getAllOffices);
router.get('/:id', Validate.validateId, OfficeController.getOneOffice);

export default router;
