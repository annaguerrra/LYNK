import { Request, Response, NextFunction } from "express"

export const validateRegisterStudent = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, userType } = req.body
    if(!username || !password || !userType)
        return res.status(400).send({ response: `There is empty data`})
    next()
}

export const validateRegisterInstructor = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, userType, specialty } = req.body
    if(!username || !password || !userType || !specialty)
        return res.status(400).send({ response: `There is empty data`})
    next()
}

export const validateRegisterAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, userType, specialty } = req.body
    if(!username || !password || !userType || !specialty)
        return res.status(400).send({ response: `There is empty data`})
    next()
}
    
export const validateUpdateStudent = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body
    if(!username || !password)
        return res.status(400).send({ response: `There is empty data`})
    next()
}

export const validateUpdateInstructor = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, specialty, action, file } = req.body
    if(!username || !password || !specialty || !action || !file)
        return res.status(400).send({ response: `There is empty data`})
    next()
}

export const validateUpdateAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, specialty, action, file } = req.body
    if(!username || !password || !specialty || !action || !file)
        return res.status(400).send({ response: `There is empty data`})
    next()
}