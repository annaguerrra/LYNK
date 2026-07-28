import { authorize } from '#api/middleware/authorize.js';
import { validateCompetence, validateRegister, validateUpdate } from '#api/middleware/disciplineMiddleware.js';
import { makeDisciplineController } from '#infrastructure/Factories/DisciplineFactory.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const disciplineController = makeDisciplineController()

router
    // route to create discipline
   .post('/discipline/create', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateRegister, disciplineController.create.bind(disciplineController))
   .post('/discipline/:id/duplicate', authorize(UserType.ADMIN, UserType.INSTRUCTOR), disciplineController.duplicateDiscipline.bind(disciplineController))
   .get('/disciplines', disciplineController.findAll.bind(disciplineController))
    // route to show a discipline
   .get('/discipline/:id', disciplineController.findOne.bind(disciplineController))
//    .get('/disciplines/get')
   .get('disciplines/:id/exams', disciplineController.viewExams.bind(disciplineController))
   .get('/discipline/:id/classes', disciplineController.viewClasses.bind(disciplineController))
   .get('/discipline/:id/materials', disciplineController.viewMaterial.bind(disciplineController))
    // route to show all competences in a discipline
   .get('/discipline/:id/competences', disciplineController.viewCompetences.bind(disciplineController))
    // route to edit a discipline
   .put('/discipline/edit/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, disciplineController.edit.bind(disciplineController))
    // route to assign competence to a discipline
   .put('/discipline/assigncompetence', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateCompetence, disciplineController.assignCompetence.bind(disciplineController))
   .delete('/discipline/delete/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), disciplineController.delete.bind(disciplineController))

export default router