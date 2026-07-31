import { registerCompetenceDTO, updateCompetenceDTO } from "#application/dtos/competenceDTO.js";
import { CompetenceService } from "#infrastructure/services/Competence/CompetenceService.js";
import { Request, Response } from "express";

export default class CompetenceController{
    constructor (
        private readonly competenceService: CompetenceService
    ) {}

    // POST
    // creates a competence
    async register(req: Request, res: Response){
        const data: registerCompetenceDTO = req.body
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId
        try {
            const competence = await this.competenceService.registerCompetence(data, userId)
            return res.status(200).send({ response: competence })
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // gets all competences
    async show(req: Request, res: Response){
        try {
            const competences = await this.competenceService.showCompetences()
            return res.status(200).send({ response: competences })
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // gets a competence by it's name
    async getCompetenceByName(req: Request, res: Response){
        const name: string = req.body
        try {
            const competence = await this.competenceService.getCompetenceByName(name)
            return res.status(200).send({ response: competence })
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }
}