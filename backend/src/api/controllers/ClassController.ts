import { assignCompetencyDTO, ClassDTO, removeCompetencyDTO } from "#application/dtos/classDTO.js";
import { ClassService } from "#infrastructure/services/Class/ClassService.js";
import { Request, response, Response } from "express";

export class ClassController {
    constructor(
        private readonly classService: ClassService
    ) {}

    // POST
    // creates class
    async register(req: Request, res: Response){
        const data: ClassDTO = req.body
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId

        try {
            const createdClass = await this.classService.create(data, userId)
            return res.status(200).send({ response: createdClass })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            return res.status(404).send({ response: "Success!"})
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    async removeCompetency(req: Request, res: Response){
        const data: removeCompetencyDTO = req.body
        const userId = req.user.userId

        try {
            const updatedClass = await this.classService.removeCompetency(data, userId)
            return res.status(200).send({ response: updatedClass })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message })

            console.log(e)
            return res.status(500).json({ message: "Unknown error" })
        }
    }

    // GET
    // finds all classes
    async findAll(req: Request, res: Response){
        try {
            const classes = await this.classService.findAll()
            return res.status(200).send({ response: classes })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // gets all materials in a class
    async viewMaterials(req: Request, res: Response){
        const { id } = req.params
        try {
            const materials = await this.classService.viewMaterials(Number(id))
            return res.status(200).send({ response: materials })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // gets all competences in a class
    async viewCompetences(req: Request, res: Response){
        const { id } = req.params
        try {
            const competences = await this.classService.viewCompetences(Number(id))
            return res.status(200).send({ response: competences })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // gets content in a class
    async viewContent(req: Request, res: Response){
        const { id } = req.params
        try {
            const content = await this.classService.viewContent(Number(id))
            return res.status(200).send({ response: content })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // used to download content in a class
    async downloadContent(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const downloadedContent = await this.classService.downloadContent(Number(id));

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="aula-${id}.pdf"`
        );

        return res.status(200).send(downloadedContent);

    } catch (e) {
        if (e instanceof Error)
            return res.status(404).json({ message: e.message });

        console.log(e);
        return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }
}