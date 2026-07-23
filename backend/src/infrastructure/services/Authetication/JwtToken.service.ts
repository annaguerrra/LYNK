import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { IJwtTokenService, JwtTokenDTO } from "#application/services/Authetication/IJwtToken.service.js";

// the constructor configures when token will expire, calls the JWT_SECRET from .env
export class JwtTokenService implements IJwtTokenService {
    private readonly secret: Secret;
    private readonly expiresIn: SignOptions["expiresIn"];
    
    constructor(){
        const secret = process.env.JWT_SECRET;

        if(!secret) throw new Error("JWT Error");
        
        this.secret = secret;
        this.expiresIn = "4h"
    }

    // generates the token, with expiration date, the digital sign and payload's data
    generate(payload: JwtTokenDTO): string {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn
        });
    }

    // verifies if the token is correct and the user access level
    verify(token: string): JwtTokenDTO {

        // compares the given token using the secret key to get a decoded token
        const decoded = jwt.verify(token, this.secret);

        // checks if the token is a valid string
        if (typeof decoded === "string") {
            throw new Error("Error. Invalid Token.");
        }

        const payload = decoded as JwtTokenDTO;
        
        // validates if the payload has an user
        if( !payload.userId){
            throw new Error("Error. Invalid User Id");
        }

        // user access level validation 
        if (
            payload.usertype !== "STUDENT" &&
            payload.usertype !== "INSTRUCTOR" &&
            payload.usertype !== "ADMIN"
        ) {
            throw new Error("Error. Invalid user type.");
        }

        // returns to controller the user token (its identity and access level)
        return {
            userId: payload.userId,
            usertype: payload.usertype
        };
}

}