import LogController from '#api/controllers/LogController.js';
import { authorize } from '#api/middleware/authorize.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const logController = new LogController()

router
    .get('logs', authorize(UserType.ADMIN, UserType.INSTRUCTOR), logController.getAll.bind(logController))
    .get('log/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), logController.getById.bind(logController))
    .get('logs/entity-type', authorize(UserType.ADMIN, UserType.INSTRUCTOR), logController.getByEntityType.bind(logController))
    .get('logs/action', authorize(UserType.ADMIN, UserType.INSTRUCTOR), logController.getByAction.bind(logController))

export default router