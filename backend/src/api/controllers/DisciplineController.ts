import { assignCompetencyDTO, DisciplineDTO } from "#application/dtos/disciplineDTO.js"
import { DisciplineService } from "#infrastructure/services/Discipline/DisciplineService.js"
import {Request, Response } from "express"

export class DisciplineController{
    constructor (
        private readonly disciplineService: DisciplineService
    ) {}

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
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // gets the discipline's area color
    async getColor(req: Request, res: Response){
        const areaid = req.body

        try{
            await this.disciplineService.getColor(areaid);
            return res.status(200).send({ response: "Success!"});
        } catch(e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // gets all disciplines
    async findAll(req: Request, res: Response){
        try{
            const disciplines = await this.disciplineService.findAll();
            return res.status(200).send({response: disciplines });
        } catch(e){
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // gets all exams in discipline
    async viewExams(req: Request, res: Response) {
        const { id } = req.params

        try {
            const exams = await this.disciplineService.viewExams(Number(id));
            return res.status(200).send({response: exams});
        } catch(e){
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }

    }

    // GET
    // gets all classes in discipline
    async viewClasses(req: Request, res: Response){
        const { id } = req.params

        try{
            const classes = await this.disciplineService.viewClasses(Number(id));
            return res.status(200).send({response: classes });
        } catch(e){
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // gets all materials in discipline
    async viewMaterial(req: Request, res: Response){
        const { id } = req.params

        try{
            const materials = await this.disciplineService.viewMaterials(Number(id));
            return res.status(200).send({response: materials });
        } catch(e){
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // gets all competences in discipline
    async viewCompetences(req: Request, res: Response){
        const { id } = req.params

        try{
            const competences = await this.disciplineService.viewCompetences(Number(id));
            return res.status(200).send({response: competences });
        } catch(e){
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // DELETE
    // deletes discipline
    async delete(req: Request, res: Response){
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId
        const { id } = req.params

        try{
            await this.disciplineService.delete(Number(id), userId);
            return res.status(200).send({response: "Success"});
        } catch(e){
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // PUT
    // updates a discipline
    async edit(req: Request, res: Response){
        const data: DisciplineDTO = req.body
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId
        const { id } = req.params

        try{
            await this.disciplineService.edit(data, Number(id), userId);
            return res.status(200).send({response: "Success"});
        } catch(e){
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }
}