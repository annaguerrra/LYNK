import UserController from "#api/controllers/UserController.js" 
import { authMiddleware } from '#api/middleware/authMiddleware.js';
import { authorize } from "#api/middleware/authorize.js";
import { validateRegister, validateUpdateAdmin, validateUpdateInstructor, validateUpdateStudent } from "#api/middleware/userMiddleware.js";
import { getBucket } from '#infrastructure/database/database.js';
import { AttachmentService } from '#infrastructure/services/Attachment/AttachmentService.js';
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js";
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js";
import { UserService } from '#infrastructure/services/User/UserService.js';
import { UserType } from "#infrastructure/src/generated/prisma/enums.js";
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router();

const attachmentService = new AttachmentService(getBucket());
const hashService = new HashService();
const jwtTokenService = new JwtTokenService();
const userService = new UserService(attachmentService, hashService, jwtTokenService);
const userController = new UserController();

router
    .post('/user/create', validateRegister, authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.register.bind(userController))
    .post('/login', userController.login.bind(userController)),

    .get('/user/showStud', userController.showStudents.bind(userController))
    .get('/user/showInst', userController.showInstructors.bind(userController))
    .get('/user/showAdmin', userController.showAdmins.bind(userController))

    .get('/user/showStud/:id', userController.showStudent.bind(userController))
    .get('/user/showInst/:id', userController.showInstructor.bind(userController))
    .get('/user/showAdmin/:id', userController.showAdmin.bind(userController))
    
    .put('/user/updateStud/:id', validateUpdateStudent, authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.updateStudent.bind(userController))
    .put('/user/updateInst/:id', validateUpdateInstructor, authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.updateInstructor.bind(userController))
    .put('/user/updateAdmin/:id', validateUpdateAdmin, authorize(UserType.ADMIN), userController.updateAdmin.bind(userController))
    
    .delete('/user/deleteStud/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.deleteStudent.bind(userController))
    .delete('/user/deleteInst/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.deleteInstructor.bind(userController))
    .delete('/user/deleteAdmin/:id', authorize(UserType.ADMIN), userController.deleteAdmin.bind(userController));
    
export default router;