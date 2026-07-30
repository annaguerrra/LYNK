import { validateRegister, validateUpdate } from '#api/middleware/areaMiddleware.js';
import { authMiddleware } from '#api/middleware/authMiddleware.js';
import { authorize } from '#api/middleware/authorize.js';
import { makeAreaFactory } from '#infrastructure/Factories/AreaFactory.js';
import { JwtTokenService } from '#infrastructure/services/Authetication/JwtToken.service.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const areaController = makeAreaFactory()
const jwt = new JwtTokenService()

router
    // route to create area
    .post('/area/create', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateRegister, areaController.register.bind(areaController))
    // route to show all areas
    .get('/areas', areaController.showAreas.bind(areaController))
    // route to edit an area
    .put('/area/edit/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateUpdate, areaController.updateArea.bind(areaController))
    // route to delete an area
    .delete('/area/delete/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), areaController.deleteArea.bind(areaController))

export default router