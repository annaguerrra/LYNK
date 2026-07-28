import { registerAreaDTO, updateAreaDTO } from "#application/dtos/areaDTO.js";
import { AreaService } from "#infrastructure/services/Area/AreaService.js";
import { Request, Response } from "express";

export default class AreaController {
    constructor (
        private readonly areaService: AreaService
    ) {}

    // POST
    // creates area
    async register(req: Request, res: Response){
        const data: registerAreaDTO = req.body
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId

        try {
            await this.areaService.registerArea(data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    // GET
    // show all areas
    async showAreas(req: Request, res: Response){
        try {
            const areas = await this.areaService.showAreas()
            return res.status(200).send({ response: areas })
        } catch (e) {
            return res.status(404).send({ response: "Area not found!" })
        }
    }

    // PUT
    // updates area
    async updateArea(req: Request, res: Response){
        const { id } = req.params
        const data: updateAreaDTO = req.body
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId

        try {
            await this.areaService.updateArea(Number(id), data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Area not found!" })
        }
    }

    // DELETE
    // deletes area
    async deleteArea(req: Request, res: Response){
        const { id } = req.params
        // variable used to get userId from request
        // will be used in service to register who was responsible for the action
        const userId = req.user.userId

        try {
            await this.areaService.deleteArea(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Area not found!" })
        }
    }
}