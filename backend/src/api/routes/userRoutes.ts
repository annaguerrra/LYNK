import UserController from "#api/controllers/UserController.js" 
import { authMiddleware } from '#api/middleware/authMiddleware.js';
import { getBucket } from '#infrastructure/database/database.js';
import { AttachmentService } from '#infrastructure/services/Attachment/AttachmentService.js';
import { UserService } from '#infrastructure/services/User/UserService.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router();

const attachmentService = new AttachmentService(getBucket());
const userService = new UserService(attachmentService);
const userController = new UserController();

router
    .post('/user/create',       userController.register.bind(userController))

    .get('/user/showStud',      userController.showStudents.bind(userController))
    .get('/user/showInst',      userController.showInstructors.bind(userController))
    .get('/user/showAdmin',     userController.showAdmins.bind(userController))

    .get('/user/showStud/:id',  userController.showStudent.bind(userController))
    .get('/user/showInst/:id',  userController.showInstructor.bind(userController))
    .get('/user/showAdmin/:id', userController.showAdmin.bind(userController))
    
    .put('/user/updateStud/:id',  userController.updateStudent.bind(userController))
    .put('/user/updateInst/:id',  userController.updateInstructor.bind(userController))
    .put('/user/updateAdmin/:id', userController.updateAdmin.bind(userController))
    
    .delete('/user/deleteStud/:id',  userController.deleteStudent.bind(userController))
    .delete('/user/deleteInst/:id',  userController.deleteInstructor.bind(userController))
    .delete('/user/deleteAdmin/:id', userController.deleteAdmin.bind(userController))
    

    .post('/login', authMiddleware, AuthController.login)
        
export default router;