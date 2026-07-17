import { registerCompetenceDTO, updateCompetenceDTO } from "#application/dtos/competenceDTO.js";
import { getBucket } from "#infrastructure/database/database.js";
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js";
import { CompetenceService } from "#infrastructure/services/Competence/CompetenceService.js";
import { UserService } from "#infrastructure/services/User/UserService.js";
import { Request, Response } from "express";

export default class CompetenceController{
    private attachmentService = new AttachmentService(getBucket())
    private userService = new UserService(this.attachmentService)
    private competenceService = new CompetenceService(this.userService)

    async register(req: Request, res: Response){
        const data: registerCompetenceDTO = req.body
        const userId = req.user.userId
        try {
            await this.competenceService.registerCompetence(data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async show(req: Request, res: Response){
        try {
            await this.competenceService.showCompetences()
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Competence not found!" })
        }
    }

    async getCompetenceByName(req: Request, res: Response){
        const name: string = req.body
        try {
            await this.competenceService.getCompetenceByName(name)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Competence not found!" })
        }
    }

    async update(req: Request, res: Response){
        const { id } = req.params
        const data: updateCompetenceDTO = req.body
        const userId = req.user.userId
        try {
            await this.competenceService.updateCompetence(Number(id), data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Competence not found!" })
        }
    }

    async delete(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId
        try {
            await this.competenceService.deleteCompetence(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Competence not found!" })
        }
    }
}