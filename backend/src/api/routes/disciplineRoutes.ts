import { authMiddleware } from '#api/middleware/authMiddleware.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateCompetence, validateRegister, validateUpdate } from '#api/middleware/disciplineMiddleware.js';
import { makeDisciplineController } from '#infrastructure/Factories/DisciplineFactory.js';
import { JwtTokenService } from '#infrastructure/services/Authetication/JwtToken.service.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const disciplineController = makeDisciplineController()
const jwt = new JwtTokenService()

router
    // route to create discipline
   .post('/discipline/create', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateRegister, disciplineController.create.bind(disciplineController))
   .post('/discipline/:id/duplicate', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), disciplineController.duplicateDiscipline.bind(disciplineController))
   .get('/disciplines', disciplineController.findAll.bind(disciplineController))
    // route to show a discipline
   .get('/discipline/:id', disciplineController.findOne.bind(disciplineController))
//    .get('/disciplines/get')
   .get('/discipline/:id/exams', disciplineController.viewExams.bind(disciplineController))
   .get('/discipline/:id/classes', disciplineController.viewClasses.bind(disciplineController))
   .get('/discipline/:id/materials', disciplineController.viewMaterial.bind(disciplineController))
    // route to show all competences in a discipline
   .get('/discipline/:id/competences', disciplineController.viewCompetences.bind(disciplineController))
    // route to edit a discipline
   .put('/discipline/edit/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, disciplineController.edit.bind(disciplineController))
    // route to assign competence to a discipline
   .put('/discipline/assigncompetence', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateCompetence, disciplineController.assignCompetence.bind(disciplineController))
   .delete('/discipline/delete/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), disciplineController.delete.bind(disciplineController))

export default router