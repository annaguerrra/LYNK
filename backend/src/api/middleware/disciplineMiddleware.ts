import { Request, Response, NextFunction } from "express"

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to create discipline
    const { name, areaID } = req.body
    if(!name || !areaID)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateCompetence = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to assign competence
    const { disciplineId, competencyId } = req.body
    if(!disciplineId || !competencyId)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to update discipline
    const { name } = req.body
    if(!name)
        return res.status(400).send({ response: `There are empty data`})
    next()
}