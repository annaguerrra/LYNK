import { Request, Response, NextFunction } from "express"

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { name, files, disciplineId, competencesId } = req.body
    if(!name || !files || !disciplineId || !competencesId)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateAttach = (req: Request, res: Response, next: NextFunction) => {
    const { examId, files } = req.body
    if(!examId || !files)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { name, disciplineId, competencesId } = req.body
    if(!name || !competencesId || !disciplineId)
        return res.status(400).send({ response: `There are empty data`})
    next()
}