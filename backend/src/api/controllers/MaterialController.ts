import { attachtFileDTO, registerMaterialDTO, updateMaterialDTO } from "#application/dtos/materialDTO.js";
import { getBucket } from "#infrastructure/database/database.js"
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js"
import { MaterialService } from "#infrastructure/services/Material/MaterialService.js"
import { UserService } from "#infrastructure/services/User/UserService.js"
import { Request, Response } from "express";

export default class MaterialController{
    private attachmentService = new AttachmentService(getBucket())
    private userService = new UserService(this.attachmentService)
    private materialService = new MaterialService(this.userService, this.attachmentService)

    async register(req: Request, res: Response){
        const data: registerMaterialDTO = req.body
        const userId = req.user.userId
        try {
            await this.materialService.registerMaterial(data, userId)
            return res.status(200).send({ response: "Material created!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async getMaterial(req: Request, res: Response){
        const { id } = req.params
        try {
            await this.materialService.getMaterialById(Number(id))
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Material not found!" })
        }
    }

    async update(req: Request, res: Response){
        const { id } = req.params
        const data: updateMaterialDTO = req.body
        const userId = req.user.userId
        try {
            await this.materialService.updateMaterial(Number(id), data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Material not found!" })
        }
    }

    async delete(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId
        try {
            await this.materialService.deleteMaterial(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Material not found" })
        }
    }

    async attachFile(req: Request, res: Response){
        const data: attachtFileDTO = req.body
        const userId = req.user.userId
        try {
            await this.materialService.attachtFile(data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Material not found!" })
        }
    }
}