import { UserType } from "#infrastructure/prisma/generated/prisma/enums.js";

export interface JwtTokenDTO{
    userId: number
    usertype: UserType
}

declare global{
    namespace Express{
        interface Request{
            user: JwtTokenDTO;
        }
    }
}

export {}