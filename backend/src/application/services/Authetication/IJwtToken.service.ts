import { JwtTokenDTO } from "#application/dtos/authDTO.js";

export interface IJwtTokenService{
    generate(payload: JwtTokenDTO): string;
    verify(token: string): JwtTokenDTO;
}

export { JwtTokenDTO };
