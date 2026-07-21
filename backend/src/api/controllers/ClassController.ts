import { assignCompetencyDTO, ClassDTO } from "#application/dtos/classDTO.js";
import { getBucket } from "#infrastructure/database/database.js";
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js";
import { ClassService } from "#infrastructure/services/Class/ClassService.js";
import { UserService } from "#infrastructure/services/User/UserService.js";
import { Request, response, Response } from "express";

export class ClassController {
    private attachmentService = new AttachmentService(getBucket())
    private userService = new UserService(this.attachmentService)
    private classService = new ClassService(this.userService)

    async register(req: Request, res: Response){
        const data: ClassDTO = req.body
        const userId = req.user.userId

        try {
            await this.classService.create(data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async assignCompetency(req: Request, res: Response){
        const data: assignCompetencyDTO = req.body
        const userId = req.user.userId

        try {
            await this.classService.assignCompetency(data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Class not found!" })
        }
    }

    async findAll(req: Request, res: Response){
        try {
            await this.classService.findAll()
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Class not found!" })
        }
    }

    async findOne(req: Request, res: Response){
        const { id } = req.params
        try {
            await this.classService.findOne(Number(id))
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Class not found!" })
        }
    }

    async viewMaterials(req: Request, res: Response){
        const { classId } = req.params
        try {
            await this.classService.viewMaterials(Number(classId))
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async viewCompetences(req: Request, res: Response){
        const { classId } = req.params
        try {
            await this.classService.viewCompetences(Number(classId))
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async viewContent(req: Request, res: Response){
        const { classId } = req.params
        try {
            await this.classService.viewContent(Number(classId))
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async downloadContent(req: Request, res: Response){
        const { classId } = req.params
        try {
            await this.classService.downloadContent(Number(classId))
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async update(req: Request, res: Response){
        const data: ClassDTO = req.body
        const { id } = req.params
        const userId = req.user.userId
        try {
            await this.classService.edit(data, Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Class not found!" })
        }
    }

    async delete(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId
        try {
            await this.classService.delete(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Class not found!" })
        }
    }
}