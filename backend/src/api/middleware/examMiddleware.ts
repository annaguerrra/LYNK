import { Request, Response, NextFunction } from "express"

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to create exam
    const { name, files, disciplineId, competencesId } = req.body
    if(!name || !files || !disciplineId || !competencesId)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateAttach = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to attach a file
    const { examId, files } = req.body
    if(!examId || !files)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to update discipline
    const { name, disciplineId, competencesId } = req.body
    if(!name || !competencesId || !disciplineId)
        return res.status(400).send({ response: `There are empty data`})
    next()
}