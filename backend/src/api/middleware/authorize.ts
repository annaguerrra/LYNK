import { UserType } from "#infrastructure/prisma/generated/prisma/enums.js";
import { Request, Response, NextFunction } from "express";

// gets as a parameter a list of usertypes allowed to perforn the action
// if the usertype of the user logged is not in the allowed usertypes list, they ara forbidden to perform the action 
export function authorize(...usersAllowed: UserType[]){
    return (req: Request, res: Response, next: NextFunction) => {

        if(!usersAllowed.includes(req.user.usertype))
            return res.status(403).send("Forbidden!")
        
        next()
    }
}