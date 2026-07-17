import { registerAreaDTO, updateAreaDTO } from "#application/dtos/areaDTO.js";
import { getBucket } from "#infrastructure/database/database.js";
import { AreaService } from "#infrastructure/services/Area/AreaService.js";
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js";
import { UserService } from "#infrastructure/services/User/UserService.js";
import { Request, Response } from "express";

export default class AreaController {
    private attachmentService = new AttachmentService(getBucket());
    private userService = new UserService(this.attachmentService);
    private areaService = new AreaService(this.userService)

    async register(req: Request, res: Response){
        const data: registerAreaDTO = req.body
        const userId = req.user.userId

        try {
            await this.areaService.registerArea(data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async showAreas(req: Request, res: Response){
        try {
            await this.areaService.showAreas()
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Area not found!" })
        }
    }

    async updateArea(req: Request, res: Response){
        const { id } = req.params
        const data: updateAreaDTO = req.body
        const userId = req.user.userId

        try {
            await this.areaService.updateArea(Number(id), data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Area not found!" })
        }
    }

    async deleteArea(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId

        try {
            await this.areaService.deleteArea(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Area not found!" })
        }
    }
}