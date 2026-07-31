import { authMiddleware } from '#api/middleware/authMiddleware.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateRegister, validateUpdate } from '#api/middleware/competenceMiddleware.js';
import { makeCompetenceController } from '#infrastructure/Factories/CompetenceFactory.js';
import { JwtTokenService } from '#infrastructure/services/Authetication/JwtToken.service.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const competenceController = makeCompetenceController()
const jwt = new JwtTokenService()

router
    // route to create competecy
    .post('/competency/create', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateRegister, competenceController.register.bind(competenceController))
    // route to show all competencies
    .get('/competencies', competenceController.show.bind(competenceController))
    // route to edit a competency
    .put('/competency/edit/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, competenceController.update.bind(competenceController))
    // route to delete a competency
    .delete('/competency/delete/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), competenceController.delete.bind(competenceController))

export default router