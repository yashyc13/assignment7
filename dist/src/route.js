import express from 'express';
import { userController } from './controller.js';
const route = express.Router();
route.get('/users', userController.getAll);
route.get('/users/:id', userController.getUserById);
route.post('/add', userController.createUser);
route.put('/update/:id', userController.updateUser);
route.delete('/delete/:id', userController.deleteUser);
export default route;
//# sourceMappingURL=route.js.map