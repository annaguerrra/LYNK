import { registerCompetenceDTO, updateCompetenceDTO } from "#application/dtos/competenceDTO.js";
import { getBucket } from "#infrastructure/database/database.js";
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js";
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js";
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js";
import { CompetenceService } from "#infrastructure/services/Competence/CompetenceService.js";
import { UserService } from "#infrastructure/services/User/UserService.js";
import { Request, Response } from "express";

export default class CompetenceController{
    private hashService = new HashService()
    private jwtService = new JwtTokenService()
    private attachmentService = new AttachmentService()
    private userService = new UserService(this.attachmentService, this.hashService, this.jwtService)
    private competenceService = new CompetenceService(this.userService)

    // POST
    // creates a competence
    async register(req: Request, res: Response){
        const data: registerCompetenceDTO = req.body
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId
        try {
            await this.competenceService.registerCompetence(data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    // GET
    // gets a competence
    async show(req: Request, res: Response){
        try {
            await this.competenceService.showCompetences()
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Competence not found!" })
        }
    }

    // GET
    // gets a competence by it's name
    async getCompetenceByName(req: Request, res: Response){
        const name: string = req.body
        try {
            await this.competenceService.getCompetenceByName(name)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Competence not found!" })
        }
    }

    // PUT
    // updates a competence
    async update(req: Request, res: Response){
        const { id } = req.params
        const data: updateCompetenceDTO = req.body
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId
        try {
            await this.competenceService.updateCompetence(Number(id), data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Competence not found!" })
        }
    }

    // DELETE
    // deletes a competence
    async delete(req: Request, res: Response){
        const { id } = req.params
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId
        try {
            await this.competenceService.deleteCompetence(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Competence not found!" })
        }
    }
}