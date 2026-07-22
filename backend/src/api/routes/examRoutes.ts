import ExamController from '#api/controllers/ExamController.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateAttach, validateRegister, validateUpdate } from '#api/middleware/examMiddleware.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const examController = new ExamController()

router
    .post('exam/create', validateRegister, authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.register.bind(examController))
    .get('exams/download/:id/:examAttachmentId', examController.download.bind(examController))
    .get('exams', authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.showExams.bind(examController))
    .get('exam/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.getExam.bind(examController))
    .put('exam/edit/:id', validateUpdate, authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.update.bind(examController))
    .put('exam/attachfile', validateAttach, authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.attachFile.bind(examController))
    .delete('exam/delete/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), examController.delete.bind(examController))

export default router