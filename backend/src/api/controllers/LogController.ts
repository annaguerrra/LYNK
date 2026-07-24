import { LogService } from "#infrastructure/services/Log/LogService.js";
import { Request, response, Response } from "express";

export default class LogController{
    private logService = new LogService()

    // GET
    // gets all the logs registered in the database without any filter
    async getAll(req: Request, res: Response){
        try {
            const logs = await this.logService.getAllLogs()
            return res.status(200).send({ response: logs })
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    // gets a specific log by id through the params
    async getById(req: Request, res: Response){
        const { id } = req.params
        try {
            const log = await this.logService.getLogById(Number(id))
            return res.status(200).send({ response: log })
        } catch (e) {
            return res.status(404).send({ response: "Log not found!" })
        }
    }

    // gets a specific log by its type from body
    async getByEntityType(req: Request, res: Response){
        const { entityType } = req.body
        try {
            const logs = await this.logService.getLogsByEntityTipe(entityType)
            return res.status(200).send({ response: logs })
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    // gets a specific log by its action from body
    async getByAction(req: Request, res: Response){
        const { action } = req.body
        try {
            const logs = await this.logService.getLogsByAction(action)
            return res.status(200).send({ response: logs })
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }
}