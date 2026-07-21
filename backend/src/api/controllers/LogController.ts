import { LogService } from "#infrastructure/services/Log/LogService.js";
import { Request, response, Response } from "express";

export default class LogController{
    private logService = new LogService()

    async getAll(req: Request, res: Response){
        try {
            await this.logService.getAllLogs()
            return res.status(200).send({ response: "Success!" })
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async getById(req: Request, res: Response){
        const { id } = req.params
        try {
            await this.logService.getLogById(Number(id))
            return res.status(200).send({ response: "Success!" })
        } catch (e) {
            return res.status(404).send({ response: "Log not found!" })
        }
    }

    async getByEntityType(req: Request, res: Response){
        const { entityType } = req.body
        try {
            await this.logService.getLogsByEntityTipe(entityType)
            return res.status(200).send({ response: "Success!" })
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async getByAction(req: Request, res: Response){
        const { action } = req.body
        try {
            await this.logService.getLogsByAction(action)
            return res.status(200).send({ response: "Success!" })
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }
}