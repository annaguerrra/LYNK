import { Request, Response, NextFunction } from "express"

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { name, files, disciplineId, classId } = req.body
    if(!name || !files || !disciplineId || !classId)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
    const { name, files, disciplineId, classId } = req.body
    if(!name || !files || !disciplineId || !classId)
        return res.status(400).send({ response: `There is empty data`})
    next()
}