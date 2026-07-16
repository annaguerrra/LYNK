import { UserType } from "#application/enums/UserType.js";

declare global {
    namespace Express {
        interface Request {
            user: {
                userId: number;
                usertype: UserType;
            };
        }
    }
}

export {};