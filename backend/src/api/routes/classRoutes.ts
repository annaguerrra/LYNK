import { ClassController } from '#api/controllers/ClassController.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateCompetency, validateRegister, validateUpdate } from '#api/middleware/classMiddleware.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const classController = new ClassController()

router
    .post('class/create', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateRegister, classController.register.bind(classController))
    .get('classes', classController.findAll.bind(classController))
    .get('class/:id', classController.findOne.bind(classController))
    .get('class/:id/materials', classController.viewMaterials.bind(classController))
    .get('class/:id/competences', classController.viewCompetences.bind(classController))
    .get('class/:id/content', classController.viewContent.bind(classController))
    .get('class/:id/content/download', classController.downloadContent.bind(classController))
    //getcontent?
    .put('class/edit/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, classController.update.bind(classController))
    .put('class/assigncompetence', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateCompetency, classController.assignCompetency.bind(classController))
    .delete('class/delete/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), classController.delete.bind(classController))

export default router
// perguntar sobre o download pras frontenders
// certinho com o figma