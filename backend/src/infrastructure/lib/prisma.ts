import { PrismaClient } from "../generated/prisma";
// talvez tenha que mudar o import para ../generated/prisma/client

export const prisma = new PrismaClient({
    log: ['query']
})