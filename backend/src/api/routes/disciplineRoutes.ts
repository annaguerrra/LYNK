import { DisciplineController } from '#api/controllers/DisciplineController.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateCompetence, validateRegister, validateUpdate } from '#api/middleware/disciplineMiddleware.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const disciplineController = new DisciplineController()

router
   .post('discipline/create', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateRegister, disciplineController.create.bind(disciplineController))
   .get('disciplines', disciplineController.findAll.bind(disciplineController))
   .get('discipline/:id', disciplineController.findOne.bind(disciplineController))
   .get('discipline/:id/materials', disciplineController.viewMaterial.bind(disciplineController))
   .get('discipline/:id/competences', disciplineController.viewCompetences.bind(disciplineController))
   .put('discipline/edit/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, disciplineController.edit.bind(disciplineController))
   .put('discipline/assigncompetence', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateCompetence, disciplineController.assignCompetence.bind(disciplineController))
   .delete('discipline/delete/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), disciplineController.delete.bind(disciplineController))

export default router