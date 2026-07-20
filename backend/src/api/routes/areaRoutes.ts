import AreaController from '#api/controllers/AreaController.js';
import { validateRegister, validateUpdate } from '#api/middleware/areaMiddleware.js';
import { authorize } from '#api/middleware/authorize.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const areaController = new AreaController()

router
    .post('/area/create', validateRegister, authorize(UserType.ADMIN, UserType.INSTRUCTOR), areaController.register.bind(areaController))
    .get('/areas', areaController.showAreas.bind(areaController))
    .put('/area/edit/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, areaController.updateArea.bind(areaController))
    .delete('/area/delete/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), areaController.deleteArea.bind(areaController))

export default router
// certinho com o figma