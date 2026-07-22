import { attachtFileDTO, registerMaterialDTO, updateMaterialDTO } from "#application/dtos/materialDTO.js";
import { getBucket } from "#infrastructure/database/database.js"
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js"
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js";
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js";
import { MaterialService } from "#infrastructure/services/Material/MaterialService.js"
import { UserService } from "#infrastructure/services/User/UserService.js"
import { Request, Response } from "express";

export default class MaterialController{
    private attachmentService = new AttachmentService()
    private hashService = new HashService()
    private jwtTokenService = new JwtTokenService()
    private userService = new UserService(this.attachmentService, this.hashService, this.jwtTokenService)
    private materialService = new MaterialService(this.userService, this.attachmentService)

    // POST
    // receives all material's related informantion from body, and to execute log record gets the userId from request.
    // The service gets this data as a parameter
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

    // POST 
    // receives the material's data from body and the userId is obtained from request to execute log record
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

    // GET
    // through the id in the parameters get all information of a specific material
    async getMaterial(req: Request, res: Response){
        const { id } = req.params
        try {
            await this.materialService.getMaterialById(Number(id))
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Material not found!" })
        }
    }

    // PUT
    // updates one or more fields for a specific material. The authenticated userid its from the request,
    // while the id provided in params identifies the material whose page is being updateda and
    // data from body is passed to substitute the old data
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

    // DELETE
    // delete all related information of a material. The userId is obtained from request to execute log record
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
   
}