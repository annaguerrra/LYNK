import { Request, Response, NextFunction } from "express"

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to create material
    const { name, files, disciplineId, classId } = req.body
    if(!name || !files || !disciplineId || !classId)
        return res.status(400).send({ response: `There are empty data`})
    next()
}

export const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to update material
    const { name, files, disciplineId, classId } = req.body
    if(!name || !files || !disciplineId || !classId)
        return res.status(400).send({ response: `There is empty data`})
    next()
}

export const validateAttach = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to attach a file
    const { materialId, files } = req.body
    if(!materialId || !files)
        return res.status(400).send({ response: `There are empty data`})
    next()
}