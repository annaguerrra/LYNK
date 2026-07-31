import { authMiddleware } from '#api/middleware/authMiddleware.js';
import { authorize } from '#api/middleware/authorize.js';
import { validateAttach, validateRegister, validateUpdate } from '#api/middleware/materialMiddleware.js';
import { makeMaterialController } from '#infrastructure/Factories/MaterialFactory.js';
import { JwtTokenService } from '#infrastructure/services/Authetication/JwtToken.service.js';
import { UserType } from '#infrastructure/src/generated/prisma/enums.js';
import { Router } from 'express';
import express from 'express';

const router: Router = express.Router()

const materialController = makeMaterialController()
const jwt = new JwtTokenService()

router
    // creates a material
    .post('/material/create', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateRegister, materialController.register.bind(materialController))
    // returns a specific material by id
    .get('/material/:id', materialController.getMaterial.bind(materialController))
    // downloads an attachment in material
    .get('/material/:id/download', materialController.download.bind(materialController))
    // allows update information of a material, by id
    .put('/material/edit/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateRegister, materialController.update.bind(materialController))
    // upload a material
    .put('/material/attach', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), validateAttach, materialController.attachFile.bind(materialController))
    // delete a material
    .delete('/material/delete/:id', authMiddleware(jwt), authorize(UserType.ADMIN, UserType.INSTRUCTOR), materialController.delete.bind(materialController))

export default router