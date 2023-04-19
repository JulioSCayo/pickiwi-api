import express from 'express';
import userController from './user.controller.js'

const router = express.Router();

router.post('/create', userController.createUser);
router.patch('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/find/:id', userController.findUser);
router.get('/all', userController.findAllUsers);

export default router;