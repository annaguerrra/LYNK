import UserController from "#api/controllers/UserController.js" 
import { authMiddleware } from "#api/middleware/authMiddleware.js";
import { authorize } from "#api/middleware/authorize.js";
import { validateRegister, validateUpdateAdmin, validateUpdateInstructor, validateUpdateStudent } from "#api/middleware/userMiddleware.js";
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js";
import { UserType } from "#infrastructure/src/generated/prisma/enums.js";
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router();

const userController = new UserController();
const jwt = new JwtTokenService()

router
    .post('/user/create', validateRegister, authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.register.bind(userController))
    .post('/login', userController.login.bind(userController))

    // returns all the students registered without any filter
    .get('/user/showStud', userController.showStudents.bind(userController))
    // returns all the instructors registered without any filter
    .get('/user/showInst', userController.showInstructors.bind(userController))
    // returns all the admins registered without any filter
    .get('/user/showAdmin', userController.showAdmins.bind(userController))

    // returns a specific student by id
    .get('/user/showStud/:id', userController.showStudent.bind(userController))
    // returns a specific instructor by id
    .get('/user/showInst/:id', userController.showInstructor.bind(userController))
    // returns a specific admin by id
    .get('/user/showAdmin/:id', userController.showAdmin.bind(userController))
    
    // allows update informations of a specific user by id    
    .put('/user/updateStud/:id', validateUpdateStudent, authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.updateStudent.bind(userController))
    // allows update informations of a specific instructor by id
    .put('/user/updateInst/:id', validateUpdateInstructor, authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.updateInstructor.bind(userController))
    // allows update informations of a specific admin by id
    .put('/user/updateAdmin/:id', validateUpdateAdmin, authorize(UserType.ADMIN), userController.updateAdmin.bind(userController))
    .put('/user/change-password', validateRegister, authMiddleware, userController.changePassword.bind(userController))

    .delete('/user/deleteStud/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.deleteStudent.bind(userController))
    // deletes an instructor by id
    .delete('/user/deleteInst/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.deleteInstructor.bind(userController))
    // deletes an admin by id
    .delete('/user/deleteAdmin/:id', authorize(UserType.ADMIN), userController.deleteAdmin.bind(userController));
    
export default router;