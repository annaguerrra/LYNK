import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { IJwtTokenService, JwtTokenDTO } from "#application/services/Authetication/IJwtToken.service.js";

export class JwtTokenService implements IJwtTokenService {
    private readonly secret: Secret;
    private readonly expiresIn: SignOptions["expiresIn"];
    
    constructor(){
        const secret = process.env.JWT_SECRET;

        if(!secret) throw new Error("JWT Error");
        
        this.secret = secret;
        this.expiresIn = "4h"
    }

    generate(payload: JwtTokenDTO): string {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn
        });
    }
    verify(token: string): JwtTokenDTO {
        const decoded = jwt.verify(token, this.secret);

        if (typeof decoded === "string") {
            throw new Error("Error. Invalid Token.");
        }

        const payload = decoded as JwtTokenDTO;
        
        if( !payload.userId){
            throw new Error("Error. Invalid User Id");
        }

        if (
            payload.usertype !== "student" &&
            payload.usertype !== "instructor" &&
            payload.usertype !== "admin"
        ) {
            throw new Error("Error. Invalid user type.");
        }

        return {
            userId: String(payload.userId),
            usertype: payload.usertype
        };
}

}