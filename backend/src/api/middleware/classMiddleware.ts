import { Request, Response, NextFunction } from "express"

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { name, content, disciplineId } = req.body
    if(!name || !content || !disciplineId)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateCompetency = (req: Request, res: Response, next: NextFunction) => {
    const { classId, competencyId } = req.body
    if(!classId || !competencyId)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { name, content } = req.body
    if(!name || !content)
        return res.status(400).send({ response: `There are empty data`})
    next()
}