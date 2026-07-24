import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (jwt: JwtTokenService) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authAutho = req.headers.authorization;
        
        if(!authAutho || !authAutho?.startsWith("Bearer")){
            return res.status(401).send("HTTP 401 Unauthorized");
        }
        
        const [, token] = String(authAutho?.split(" "));
        
        const payload = jwt.verify(token);

        req.user = {
            userId: Number(payload.userId),
            usertype: payload.usertype
        }

        next();
    }
}