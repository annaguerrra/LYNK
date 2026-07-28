import { UserType } from "#infrastructure/src/generated/prisma/enums.js"
import { Request, Response, NextFunction, response } from "express"

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to create a user
    const { username, password, repeatpassword, userType, specialty } = req.body

    // verifies if the usertype to determine the data necessary to create
    if (userType === UserType.STUDENT){

        if(!username || !password || !repeatpassword || !userType)
            return res.status(400).send({ response: `There is empty data`})
    }

    if (userType === UserType.INSTRUCTOR || userType === UserType.ADMIN){

        if(!username || !password || !repeatpassword || !userType || !specialty)
            return res.status(400).send({ response: `There is empty data`})
    }

    // verifies if the passowrd and repeatpassword inputs match
    if(password != repeatpassword)
        return res.status(400).send({ response: `Passwords don't match`})
    next()
}

export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword, confirmPassword} = req.body
    
    if(!oldPassword || !newPassword || !confirmPassword){
        return res.status(400).send({ response: `There is empty data.`});
    }

    else if(oldPassword === newPassword) {
        return res.status(400).send({ response: `Your new password cannot be the same as your old password. Try again`});
    }
    
    else if( newPassword !== confirmPassword){
        return res.status(400).send({ response: `Passwords do not match. Try again`});

    }
    next()
}
    
export const validateUpdateStudent = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to update a student
    const { username, password } = req.body
    if(!username || !password)
        return res.status(400).send({ response: `There is empty data`})
    next()
}

export const validateUpdateInstructor = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to update an instructor
    const { username, password, specialty, action, file } = req.body
    if(!username || !password || !specialty || !action || !file)
        return res.status(400).send({ response: `There is empty data`})
    next()
}

export const validateUpdateAdmin = (req: Request, res: Response, next: NextFunction) => {
    // validates if the necessary data were provided to update an admin
    const { username, password, specialty, action, file } = req.body
    if(!username || !password || !specialty || !action || !file)
        return res.status(400).send({ response: `There is empty data`})
    next()
}