import MaterialController from '#api/controllers/MaterialController.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateAttach, validateRegister, validateUpdate } from '#api/middleware/materialMiddleware.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const materialController = new MaterialController()

router
    // creates a material
    .post('/material/create', validateRegister, authorize(UserType.ADMIN, UserType.INSTRUCTOR), materialController.register.bind(materialController))
    // returns a specific material by id
    .get('/material/:id', materialController.getMaterial.bind(materialController))
    // allows update information of a material, by id
    .put('/material/edit/:id', validateUpdate, authorize(UserType.ADMIN, UserType.INSTRUCTOR), materialController.update.bind(materialController))
    // upload a material
    .put('/material/attach', validateAttach, authorize(UserType.ADMIN, UserType.INSTRUCTOR), materialController.attachFile.bind(materialController))
    // delete a material
    .delete('/material/delete/:id', authorize(UserType.ADMIN, UserType.INSTRUCTOR), materialController.delete.bind(materialController))

export default router