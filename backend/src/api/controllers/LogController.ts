import { Action, EntityType } from "#infrastructure/prisma/generated/prisma/enums.js";
import { LogService } from "#infrastructure/services/Log/LogService.js";
import { Request, response, Response } from "express";

export default class LogController{
    constructor (
        private readonly logService: LogService
    ) {}

    // GET
    // gets all the logs registered in the database without any filter
    async getAll(req: Request, res: Response){
        try {
            const logs = await this.logService.getAllLogs()
            return res.status(200).send({ response: logs })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // gets a specific log by id through the params
    async getById(req: Request, res: Response){
        const { id } = req.params
        try {
            const log = await this.logService.getLogById(Number(id))
            return res.status(200).send({ response: log })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // gets a specific log by its type from body
    async getByEntityType(req: Request, res: Response){
        const { entitytype } = req.params
        const lowerEntityType = (entitytype as string).toLowerCase()
        let type: EntityType

        try {
            switch (lowerEntityType) {
                case 'class':
                    type = EntityType.CLASS
                    break
                case 'competence':
                    type = EntityType.INSTRUCTOR
                    break
                case 'material':
                    type = EntityType.MATERIAL
                    break
                case 'instructor':
                    type = EntityType.INSTRUCTOR
                    break
                case 'discipline':
                    type = EntityType.DISCIPLINE
                    break
                case 'area':
                    type = EntityType.AREA
                    break
                case 'student':
                    type = EntityType.STUDENT
                    break
                case 'exam':
                    type = EntityType.EXAM
                    break
                case 'admin':
                    type = EntityType.ADMIN
                    break
                default: 
                    throw new Error("Invalid entity-type")
            }

            const logs = await this.logService.getLogsByEntityTipe(type)
            return res.status(200).send({ response: logs })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // gets a specific log by its action from body
    async getByAction(req: Request, res: Response){
        const { action } = req.params
        const lowerAction = (action as string).toLowerCase()
        let type: Action
        console.log("aquiii")

        try {
            switch (lowerAction) {
                case 'created':
                    type = Action.CREATED
                    break
                case 'updated':
                    type = Action.UPDATED
                    break
                case 'deleted':
                    type = Action.DELETED
                    break
                default:
                    console.log(lowerAction)
                    throw new Error("Invalid action")
            }

            const logs = await this.logService.getLogsByAction(type)
            return res.status(200).send({ response: logs })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }
}