import AreaController from '#api/controllers/AreaController.js';
import { validateRegister, validateUpdate } from '#api/middleware/areaMiddleware.js';
import { authorize } from '#api/middleware/authorize.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const areaController = new AreaController()

router
    // route to create area
    .post('/area/create', validateRegister, authorize(UserType.ADMIN, UserType.INSTRUCTOR), areaController.register.bind(areaController))
    // route to show all areas
    .get('/areas', areaController.showAreas.bind(areaController))
    // route to edit an area
    .put('/area/edit/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, areaController.updateArea.bind(areaController))
    // route to delete an area
    .delete('/area/delete/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), areaController.deleteArea.bind(areaController))

export default router