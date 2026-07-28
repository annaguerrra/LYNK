import { authorize } from '#api/middleware/authorize.js';
import { makeLogController } from '#infrastructure/Factories/LogFactory.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const logController = makeLogController()

router
    // returns all logs without any filter
    .get('/logs', authorize(UserType.ADMIN, UserType.INSTRUCTOR), logController.getAll.bind(logController))
    // returns a specific log by id
    .get('/log/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), logController.getById.bind(logController))
    // returns all logs filtered by entity trpe
    .get('/logs/entity-type', authorize(UserType.ADMIN, UserType.INSTRUCTOR), logController.getByEntityType.bind(logController))
    // returns all logs filtered by action
    .get('/logs/action', authorize(UserType.ADMIN, UserType.INSTRUCTOR), logController.getByAction.bind(logController))

export default router