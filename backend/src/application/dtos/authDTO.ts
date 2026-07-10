export interface JwtTokenDTO{
    userId: String
    usertype: "student" | "instructor" | "admin"
}

declare global{
    namespace Express{
        interface Request{
            user?: JwtTokenDTO;
        }
    }
}