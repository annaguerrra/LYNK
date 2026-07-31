import { authMiddleware } from "#api/middleware/authMiddleware.js";
import { authorize } from "#api/middleware/authorize.js";
import { validateRegister, validateUpdateAdmin, validateUpdateInstructor, validateUpdateStudent, validatePassword } from "#api/middleware/userMiddleware.js";
import { makeUserController } from "#infrastructure/Factories/UserFactory.js";
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js";
import { UserType } from "#infrastructure/src/generated/prisma/enums.js";
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router();

const userController = makeUserController();
const jwt = new JwtTokenService()

router
    .post("/user/create", authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateRegister, userController.register.bind(userController)) // ok
    .post('/login', userController.login.bind(userController)) // ok

    // returns all users registered without any filter
    .get('/user/showAll', userController.showAll.bind(userController))
    // returns all the students registered without any filter
    .get('/user/showStud', userController.showStudents.bind(userController)) // ok
    // returns all the instructors registered without any filter
    .get('/user/showInst', userController.showInstructors.bind(userController)) // ok
    // returns all the admins registered without any filter
    .get('/user/showAdmin', userController.showAdmins.bind(userController)) // ok

    // returns a specific student by id
    .get('/user/showStud/:id', userController.showStudent.bind(userController)) // ok
    // returns a specific instructor by id
    .get('/user/showInst/:id', userController.showInstructor.bind(userController)) // ok
    // returns a specific admin by id
    .get('/user/showAdmin/:id', userController.showAdmin.bind(userController)) // ok
    
    // allows update informations of a specific user by id    
    .put('/user/updateStud/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdateStudent, userController.updateStudent.bind(userController))
    // allows update informations of a specific instructor by id
    .put('/user/updateInst/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdateInstructor, userController.updateInstructor.bind(userController))
    // allows update informations of a specific admin by id
    .put('/user/updateAdmin/:id', authMiddleware(jwt), authorize(UserType.ADMIN), validateUpdateAdmin, userController.updateAdmin.bind(userController))
    .put('/user/reset-password/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.resetPassword.bind(userController))
    .put('/user/change-password', authMiddleware(jwt), validatePassword, userController.changePassword.bind(userController)) // ok

    .delete('/user/deleteStud/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.deleteStudent.bind(userController))
    // deletes an instructor by id
    .delete('/user/deleteInst/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), userController.deleteInstructor.bind(userController))
    // deletes an admin by id
    .delete('/user/deleteAdmin/:id', authMiddleware(jwt), authorize(UserType.ADMIN), userController.deleteAdmin.bind(userController));
    
export default router;