import { UserType } from "#infrastructure/prisma/generated/prisma/enums.js";
import { Request, Response, NextFunction } from "express";

export function authorize(...usersAllowed: UserType[]){
    return (req: Request, res: Response, next: NextFunction) => {

        if(!usersAllowed.includes(req.user.usertype))
            return res.status(403).send("Forbidden!")
        
        next()
    }
}