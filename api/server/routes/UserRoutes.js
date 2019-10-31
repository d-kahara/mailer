import { Router } from 'express';
import UserController from '../controllers/UserController';
import Usercontroller from '../controllers/UserController';

const router = Router();

router.post('/', UserController.addUser);
router.get('/sendEmail', UserController.sendEmail);
router.get('/', UserController.getAllUsers);
router.get('/uploadSheetData', Usercontroller.uploadSheetData);

export default router;
