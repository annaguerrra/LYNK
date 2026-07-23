import { NextFunction, Request, response, Response } from "express"

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data to create area were provided
    const { name, color } = req.body
    if(!name || !color)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { name, color } = req.body
    const colorRegex = new RegExp("^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$");
    
    // validates if the necessary data were provided
    if(!name || !color)
        return res.status(400).send({ response: `There are empty data`})

    // validates if the color provided is in the hexaldecimal format
    if(!colorRegex.test(color))
        return res.status(400).send({ response: `Invalid color format`})
    next()
}