import express from 'express';
import recordController from './record.controller.js'

const router = express.Router();

router.post('/create', recordController.createRecord);
router.patch('/update/:id', recordController.updateRecord);
router.delete('/delete/:id', recordController.deleteRecord);
router.get('/find/:id', recordController.findRecord);
router.get('/all', recordController.findAllRecords);

export default router;