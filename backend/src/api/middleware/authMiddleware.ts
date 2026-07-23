import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction, jwt: JwtTokenService) => {
    const authAutho = req.headers.authorization;
    
    if(!authAutho || !authAutho?.startsWith("Bearer")){
        res.status(401).send("HTTP 401 Unauthorized");
    }
    
    const [, token] = String(authAutho?.split(" "));
    
    const payload = jwt.verify(token);

    req.user = {
        userId: Number(payload.userId),
        usertype: payload.usertype
    }

    next();
}