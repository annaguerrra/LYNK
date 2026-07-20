import { UserType } from "#infrastructure/src/generated/prisma/enums.js"
import { Request, Response, NextFunction } from "express"

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { username, password, repeatpassword, userType, specialty } = req.body

    if (userType === UserType.STUDENT){

        if(!username || !password || !repeatpassword || !userType)
            return res.status(400).send({ response: `There is empty data`})
    }

    if (userType === UserType.INSTRUCTOR || userType === UserType.ADMIN){

        if(!username || !password || !repeatpassword || !userType || !specialty)
            return res.status(400).send({ response: `There is empty data`})
    }

    if(password != repeatpassword)
        return res.status(400).send({ response: `Passwords don't match`})
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