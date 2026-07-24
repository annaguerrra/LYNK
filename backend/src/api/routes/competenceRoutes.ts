import CompetenceController from '#api/controllers/CompetenceController.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateRegister, validateUpdate } from '#api/middleware/competenceMiddleware.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const competenceController = new CompetenceController()

router
    // route to create competecy
    .post('/competency/create', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateRegister, competenceController.register.bind(competenceController))
    // route to show all competencies
    .get('/competencies', competenceController.show.bind(competenceController))
<<<<<<< HEAD
    // route to edit a competency
    .put('/competency/edit/id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, competenceController.update.bind(competenceController))
    // route to delete a competency
=======
    .put('/competency/edit/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, competenceController.update.bind(competenceController))
>>>>>>> back
    .delete('/competency/delete/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), competenceController.delete.bind(competenceController))

export default router