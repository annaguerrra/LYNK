import { PrismaClient } from "../prisma/generated/prisma/client.js";
// talvez tenha que mudar o import para ../generated/prisma/client

export const prisma = new PrismaClient({
    log: ['query']
})