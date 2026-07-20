import MaterialController from '#api/controllers/MaterialController.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateAttach, validateRegister, validateUpdate } from '#api/middleware/materialMiddleware.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const materialController = new MaterialController()

router
    .post('material/create', validateRegister, authorize(UserType.ADMIN, UserType.INSTRUCTOR), materialController.register.bind(materialController))
    .get('material/:id', materialController.getMaterial.bind(materialController))
    .put('material/edit/:id', validateUpdate, authorize(UserType.ADMIN, UserType.INSTRUCTOR), materialController.update.bind(materialController))
    .put('material/attach', validateAttach, authorize(UserType.ADMIN, UserType.INSTRUCTOR), materialController.attachFile.bind(materialController))
    .delete('material/delete/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), materialController.delete.bind(materialController))

export default router