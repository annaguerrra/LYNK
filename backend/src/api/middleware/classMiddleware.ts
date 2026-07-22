import { Request, Response, NextFunction } from "express"

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to create class
    const { name, content, disciplineId } = req.body
    if(!name || !content || !disciplineId)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateCompetency = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to assign a competence
    const { classId, competencyId } = req.body
    if(!classId || !competencyId)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to update class
    const { name, content } = req.body
    if(!name || !content)
        return res.status(400).send({ response: `There are empty data`})
    next()
}