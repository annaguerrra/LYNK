import { authMiddleware } from '#api/middleware/authMiddleware.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateCompetency, validateRegister, validateUpdate } from '#api/middleware/classMiddleware.js';
import { makeClassController } from '#infrastructure/Factories/ClassFactory.js';
import { JwtTokenService } from '#infrastructure/services/Authetication/JwtToken.service.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const classController = makeClassController()
const jwt = new JwtTokenService()

router
    // route to create area
    .post('/class/create', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateRegister, classController.register.bind(classController))
    // route to show all areas
    .get('/classes', classController.findAll.bind(classController))
    // route to show an area
    .get('/class/:id', classController.findOne.bind(classController))
    // route to show all materials in an area
    .get('/class/:id/materials', classController.viewMaterials.bind(classController))
    // route to show all competences in an area
    .get('/class/:id/competences', classController.viewCompetences.bind(classController))
    // route to show content in an area
    .get('/class/:id/content', classController.viewContent.bind(classController))
    // route to download content
    .get('/class/:id/content/download', classController.downloadContent.bind(classController))
    // route to edit an area
    .put('/class/edit/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, classController.update.bind(classController))
    // route to assign an competence to an area
    .put('/class/assigncompetence', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateCompetency, classController.assignCompetency.bind(classController))
    // route to delete an area
    .delete('/class/delete/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), classController.delete.bind(classController))

export default router