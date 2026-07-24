import { assignCompetencyDTO, DisciplineDTO } from "#application/dtos/disciplineDTO.js"
import { getBucket } from "#infrastructure/database/database.js"
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js"
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js"
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js"
import { DisciplineService } from "#infrastructure/services/Discipline/DisciplineService.js"
import { UserService } from "#infrastructure/services/User/UserService.js"
import {Request, response, Response } from "express"

export class DisciplineController{
    private hashService = new HashService()
    private jwtService = new JwtTokenService()
    private attachmentService = new AttachmentService()
    private userService = new UserService(this.attachmentService, this.hashService, this.jwtService)
    private disciplineService = new DisciplineService(this.userService)

    // POST
    // creates a discipline
    async create(req: Request, res: Response){
        const data: DisciplineDTO = req.body
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId

        try{
            await this.disciplineService.create(data, userId)
            return res.status(200).send({response: "Discipline created!"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }
    
    // POST
    // duplicates a discipline
    async duplicateDiscipline(req: Request, res: Response){
        const { id } = req.params
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userid = req.user.userId

        try {
            await this.disciplineService.duplicate(Number(id), userid)
            return res.status(200).send({response: "Discipline duplicated!"})
        } catch (e) {
            return res.status(500).send({response: e})
        }
    }

    // PUT
    // assign competence to a discipline
    async assignCompetence(req: Request, res: Response){
        const data: assignCompetencyDTO = req.body
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId

        try{
            await this.disciplineService.assignCompetence(data, userId);
            return res.status(200).send({response: "Discipline updated!"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }

    // GET
    // gets all disciplines
    async findAll(req: Request, res: Response){
        try{
            const disciplines = await this.disciplineService.findAll();
            return res.status(200).send({response: disciplines });
        } catch(e){
            return res.status(500).send({response: e});
        }
    }

    // GET
    // gets a discipline
    async findOne(req: Request, res: Response){
        const { id } = req.params

        try{
            const discipline = await this.disciplineService.findOne(Number(id));
            return res.status(200).send({response: discipline });
        } catch(e){
            return res.status(500).send({response: e});
        }
    }

    // GET
    // gets all classes in discipline
    async viewClasses(req: Request, res: Response){
        const disciplineId = req.body

        try{
            const classes = await this.disciplineService.viewClasses(disciplineId);
            return res.status(200).send({response: classes });
        } catch(e){
            return res.status(500).send({response: e});
        }
    }

    // GET
    // gets all materials in discipline
    async viewMaterial(req: Request, res: Response){
        const disciplineId = req.body

        try{
            const materials = await this.disciplineService.viewMaterials(disciplineId);
            return res.status(200).send({response: materials });
        } catch(e){
            return res.status(500).send({response: e});
        }
    }

    // GET
    // gets all competences in discipline
    async viewCompetences(req: Request, res: Response){
        const disciplineId = req.body

        try{
            const competences = await this.disciplineService.viewCompetences(disciplineId);
            return res.status(200).send({response: competences });
        } catch(e){
            return res.status(500).send({response: e});
        }
    }

    // DELETE
    // deletes discipline
    async delete(req: Request, res: Response){
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId
        const disciplineId = req.body

        try{
            await this.disciplineService.delete(disciplineId, userId);
            return res.status(200).send({response: "Success"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }

    // PUT
    // updates a discipline
    async edit(req: Request, res: Response){
        const data: DisciplineDTO = req.body
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId
        const disciplineId = req.body

        try{
            await this.disciplineService.edit(data, disciplineId, userId);
            return res.status(200).send({response: "Success"});
        } catch(e){
            return res.status(500).send({response: e});
        }
    }
}