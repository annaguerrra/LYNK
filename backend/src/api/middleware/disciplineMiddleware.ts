import { Request, Response, NextFunction } from "express"

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to create discipline
    const { name, workload, areaID } = req.body
    if(!name || !areaID)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateCompetence = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to assign competence
    const { disciplineId, competencyID } = req.body
    if(!disciplineId || !competencyID)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to update discipline
    const { name, workload } = req.body
    if(!name || !workload)
        return res.status(400).send({ response: `There are empty data`})
    next()
}