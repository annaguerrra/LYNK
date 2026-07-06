export interface JwtTokenPayload{
    userId: String
    usertype: "student" | "instructor" | "admin"
}

export interface IJwtTokenService{
    generate(payload: JwtTokenPayload): string;
    verify(token: string): JwtTokenPayload;
}