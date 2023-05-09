import express from 'express';
import recordController from './record.controller.js';
import { verifyToken } from '../../middlewares/verify_token.middleware.js';

const router = express.Router();

router.post('/create', recordController.createRecord);
router.patch('/update/:id', verifyToken, recordController.updateRecord);
router.delete('/delete/:id', verifyToken, recordController.deleteRecord);
router.get('/find/:id', verifyToken, recordController.findRecord);
router.get('/all/:id', verifyToken, recordController.findAllUserRecords);
router.get('/all', verifyToken, recordController.findAllRecords);

export default router;