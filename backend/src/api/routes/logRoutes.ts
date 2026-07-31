import { authMiddleware } from '#api/middleware/authMiddleware.js';
import { authorize } from '#api/middleware/authorize.js';
import { makeLogController } from '#infrastructure/Factories/LogFactory.js';
import { JwtTokenService } from '#infrastructure/services/Authetication/JwtToken.service.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const logController = makeLogController()
const jwt = new JwtTokenService()

router
    // returns all logs without any filter
    .get('/logs', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), logController.getAll.bind(logController))
    // returns a specific log by id
    .get('/log/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), logController.getById.bind(logController))
    // returns all logs filtered by entity trpe
    .get('/logs/entitytype/:entitytype', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), logController.getByEntityType.bind(logController))
    // returns all logs filtered by action
    .get('/logs/action/:action', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), logController.getByAction.bind(logController))

export default router