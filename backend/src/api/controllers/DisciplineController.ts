import { assignCompetencyDTO, DisciplineDTO } from "#application/dtos/disciplineDTO.js"
import { getBucket } from "#infrastructure/database/database.js"
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js"
import { DisciplineService } from "#infrastructure/services/Discipline/DisciplineService.js"
import { UserService } from "#infrastructure/services/User/UserService.js"
import {Request, response, Response } from "express"

export class DisciplineController{
    private attachmentService = new AttachmentService(getBucket())
    private userService = new UserService(this.attachmentService)
    private disciplineService = new DisciplineService(this.userService)

    async create(req: Request, res: Response){
        const data: DisciplineDTO = req.body
        const userId = req.user.userId

        try{
            await this.disciplineService.create(data, userId)
            return res.status(200).send({response: "Discipline created!"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }
    async assignCompetence(req: Request, res: Response){
        const data: assignCompetencyDTO = req.body
        const userId = req.user.userId

        try{
            await this.disciplineService.assignCompetence(data, userId);
            return res.status(200).send({response: "Discipline updated!"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }
    async findAll(req: Request, res: Response){
        try{
            await this.disciplineService.findAll();
            return res.status(200).send({response: "Success"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }
    async findOne(req: Request, res: Response){
        const classId = req.body

        try{
            await this.disciplineService.findOne(classId);
            return res.status(200).send({response: "Success"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }
    async viewClasses(req: Request, res: Response){
        const classId = req.body

        try{
            await this.disciplineService.viewClasses(classId);
            return res.status(200).send({response: "Success"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }
    async viewMaterial(req: Request, res: Response){
        const materialId = req.body

        try{
            await this.disciplineService.viewMaterials(materialId);
            return res.status(200).send({response: "Success"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }
    async viewCompetences(req: Request, res: Response){
        const competenceId = req.body

        try{
            await this.disciplineService.viewCompetences(competenceId);
            return res.status(200).send({response: "Success"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }
    async delete(req: Request, res: Response){
        const userId = req.body
        const disciplineId = req.body

        try{
            await this.disciplineService.delete(disciplineId, userId);
            return res.status(200).send({response: "Success"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }
    async edit(req: Request, res: Response){
        const data: DisciplineDTO = req.body
        const userId = req.body
        const disciplineId = req.body

        try{
            await this.disciplineService.edit(data, disciplineId, userId);
            return res.status(200).send({response: "Success"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }
}