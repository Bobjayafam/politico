import express from 'express';
import OfficeController from '../controllers/OfficeController';
import Validate from '../middleware/Validate';
import Auth from '../middleware/Auth';

const router = express.Router();

router.post('/', Auth.isLoggedInAsAdmin, Validate.validateOffice, OfficeController.createoffice);
router.get('/', Auth.isLoggedIn, OfficeController.getAllOffices);
router.get('/:id', Validate.validateId, Auth.isLoggedIn, OfficeController.getOneOffice);
router.post('/:id/register', Validate.validateId, Auth.isLoggedInAsAdmin, OfficeController.registerCandidate);
router.get('/:id/result', Validate.validateId, Auth.isLoggedIn, OfficeController.getResult);

export default router;
