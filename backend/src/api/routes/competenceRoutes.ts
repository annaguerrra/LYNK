import CompetenceController from '#api/controllers/CompetenceController.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateRegister, validateUpdate } from '#api/middleware/competenceMiddleware.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const competenceController = new CompetenceController()

router
    .post('competency/create', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateRegister, competenceController.register.bind(competenceController))
    .get('competencies', competenceController.show.bind(competenceController))
    // byname?
    .put('competency/edit/id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, competenceController.update.bind(competenceController))
    .delete('competency/delete/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), competenceController.delete.bind(competenceController))

export default router
// perguntar do byname