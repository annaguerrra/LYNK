import ExamController from '#api/controllers/ExamController.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateAttach, validateRegister, validateUpdate } from '#api/middleware/examMiddleware.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const examController = new ExamController()

router
    // creates an exam
    .post('/exam/create', validateRegister, authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.register.bind(examController))
<<<<<<< HEAD
    // allows downloading an exam
    .get('/exams/download/:id/:examAttachmentId', examController.download.bind(examController))
    // returns all exams without any filter
=======
    .get('/exam/download/:id/:examAttachmentId', examController.download.bind(examController))
>>>>>>> back
    .get('/exams', authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.showExams.bind(examController))
    // returns a specific exam by id
    .get('/exam/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.getExam.bind(examController))
    // to update an exam's data
    .put('/exam/edit/:id', validateUpdate, authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.update.bind(examController))
    // to attach an exam file
    .put('/exam/attachfile', validateAttach, authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.attachFile.bind(examController))
    // to delete an specific exam by id
    .delete('/exam/delete/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.delete.bind(examController))

export default router