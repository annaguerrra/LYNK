import { assignCompetencyDTO, ClassDTO } from "#application/dtos/classDTO.js";
import { getBucket } from "#infrastructure/database/database.js";
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js";
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js";
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js";
import { ClassService } from "#infrastructure/services/Class/ClassService.js";
import { CompetenceService } from "#infrastructure/services/Competence/CompetenceService.js";
import { DisciplineService } from "#infrastructure/services/Discipline/DisciplineService.js";
import { MaterialService } from "#infrastructure/services/Material/MaterialService.js";
import { UserService } from "#infrastructure/services/User/UserService.js";
import { Request, response, Response } from "express";

export class ClassController {
    private hashService = new HashService()
    private jwtService = new JwtTokenService()
    private attachmentService = new AttachmentService()
    private userService = new UserService(this.attachmentService, this.hashService, this.jwtService)
    private competenceService = new CompetenceService(this.userService)
    private disciplineService = new DisciplineService(this.userService)
    private materialsService = new MaterialService(this.userService, this.attachmentService)
    private classService = new ClassService(this.userService, this.competenceService, this.disciplineService, this.materialsService)

    // POST
    // creates class
    async register(req: Request, res: Response){
        const data: ClassDTO = req.body
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId

        try {
            await this.classService.create(data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    // PUT
    // assign an competency to a class
    async assignCompetency(req: Request, res: Response){
        const data: assignCompetencyDTO = req.body
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId

        try {
            await this.classService.assignCompetency(data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Class not found!" })
        }
    }

    // GET
    // finds all classes
    async findAll(req: Request, res: Response){
        try {
            const classes = await this.classService.findAll()
            return res.status(200).send({ response: classes })
        } catch (e) {
            return res.status(404).send({ response: "Class not found!" })
        }
    }

    // GET
    // finds a class
    async findOne(req: Request, res: Response){
        const { id } = req.params
        try {
            const item = await this.classService.findOne(Number(id))
            return res.status(200).send({ response: item })
        } catch (e) {
            return res.status(404).send({ response: "Class not found!" })
        }
    }

    // GET
    // gets all materials in a class
    async viewMaterials(req: Request, res: Response){
        const { classId } = req.params
        try {
            const materials = await this.classService.viewMaterials(Number(classId))
            return res.status(200).send({ response: materials })
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    // GET
    // gets all competences in a class
    async viewCompetences(req: Request, res: Response){
        const { classId } = req.params
        try {
            const competences = await this.classService.viewCompetences(Number(classId))
            return res.status(200).send({ response: competences })
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    // GET
    // gets content in a class
    async viewContent(req: Request, res: Response){
        const { classId } = req.params
        try {
            const content = await this.classService.viewContent(Number(classId))
            return res.status(200).send({ response: content })
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    // GET
    // used to download content in a class
    async downloadContent(req: Request, res: Response){
        const { classId } = req.params
        try {
            const downloadedContent = await this.classService.downloadContent(Number(classId))
            return res.status(200).send({ response: downloadedContent })
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    // PUT
    // updates a class
    async update(req: Request, res: Response){
        const data: ClassDTO = req.body
        const { id } = req.params
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId
        try {
            await this.classService.edit(data, Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Class not found!" })
        }
    }

    // DELETE
    // deletes a class
    async delete(req: Request, res: Response){
        const { id } = req.params
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId
        try {
            await this.classService.delete(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Class not found!" })
        }
    }
}