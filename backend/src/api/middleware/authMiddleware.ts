import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js";
import { Request, Response, NextFunction, response } from "express";

export const authMiddleware = (jwt: JwtTokenService) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authAutho = req.headers.authorization;
        console.log("Authorization header:",authAutho);
        
        if(!authAutho || !authAutho?.startsWith("Bearer ")){
            return res.status(401).send({
                code: "NO_TOKEN",
                response: "HTTP 401 Unauthorized"
            });
        }
        
        try{
            const [, token] = authAutho?.split(" ");

            const payload = jwt.verify(token);
    
            req.user = {
                userId: Number(payload.userId),
                usertype: payload.usertype
            }
    
            next();
        } catch(error) {
            if( error instanceof Error && error.name === "TokenExpiredError"){
                return res.status(401).send({
                    code: "TOKEN_EXPIRED",
                    response: "Session expired. Please login again."
                });
            }

            return res.status(401).send({
                code: "INVALID_TOKEN",
                response: "Invalid token."
            });
        }
        
    }
}