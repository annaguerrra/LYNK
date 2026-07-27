import { prisma } from "#infrastructure/lib/prisma.js";
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js";
import "dotenv/config";
import { error } from "node:console";

// HOW TO RUN THE SEED
// 1. Run the database migrations:
//    npx prisma migrate dev
//
// 2. Generate the Prisma Client:
//    npx prisma generate
//
// 3. Run the seed:
//    npm run seed
//
// 4. Start the application:
//    npm run dev

// TROUBLESHOOTING
// If this error happens:
// Error [ERR_MODULE_NOT_FOUND]: Cannot find module '@prisma/client/runtime/library'
//
// It may be caused by different versions of prisma and @prisma/client.
// First, check the installed versions:
// npm list prisma @prisma/client
//
// Both packages must have the same version.
// If they are different, fix them by running:
// npm install @prisma/client@6.19.3
// npm install -D prisma@6.19.3
//
// Then delete node_modules and package-lock.json, reinstall the dependencies,
// generate Prisma Client again, and run the seed:
//
// npm install
// npx prisma generate
// npm run seed

async function main() {
    const hashService = new HashService()

    const existingAdmin = await prisma.admin.findUnique({
        where:{
            username: "admin"
        }
    });

    if(existingAdmin) {
        throw new Error("Default admin already exists.");
    }

    const hashedPassword = await hashService.hash("admin123");

    await prisma.admin.create({
        data:{
            username: "admin",
            password: hashedPassword,
            userType: "ADMIN",
            specialty: "Digital",
            active: true,
            firstAccess: true,
            updatedPasswordAt: new Date()
        }
    });

    console.log("Default admin created successfully!");
    
}
// runs the seed
main()
// handles errors and stops the process
.catch((error) => {
    console.log(error);
    process.exit(1);
})
// closes the database connection
.finally(async () => {
    await prisma.$disconnect();
}); 
