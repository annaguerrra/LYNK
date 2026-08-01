import { authMiddleware } from '#api/middleware/authMiddleware.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateRegister, validateUpdate } from '#api/middleware/examMiddleware.js';
import { upload } from '#api/middleware/uploadMiddleware.js';
import { makeExamController } from '#infrastructure/Factories/ExamFactory.js';
import { JwtTokenService } from '#infrastructure/services/Authetication/JwtToken.service.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const examController = makeExamController()
const jwt = new JwtTokenService()

router
    // creates an exam
    .post('/exam/create', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), upload, validateRegister, examController.register.bind(examController))
    // allows downloading an exam
    .get('/exam/:id/download/:examAttachmentId', examController.download.bind(examController))
    // returns all exams without any filter
    .get('/exams', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.showExams.bind(examController))
    // returns a specific exam by id
    .get('/exam/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.getExam.bind(examController))
    // to update an exam's data
    .put('/exam/edit/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, examController.update.bind(examController))
    // to attach an exam file
    .put('/exam/:id/attachfile', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), upload, examController.attachFile.bind(examController))
    // to delete an specific exam by id
    .delete('/exam/delete/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.delete.bind(examController))

export default router