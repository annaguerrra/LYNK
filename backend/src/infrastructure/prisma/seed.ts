import { prisma } from "#infrastructure/lib/prisma.js";
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js";
import "dotenv/config";
import { error } from "node:console";

// HOW TO RUN THE SEED
// 1. npx migrate dev
// 2. npx prisma generate
// 3. npm run seed <---
// 4. npm run dev 

// if anything like that happens: Error [ERR_MODULE_NOT_FOUND]: Cannot find module 'C:\Users\Aluno\Desktop\LYNK\backend\node_modules\@prisma\client\runtime\library
// run: npm install @prisma/client@6.19.3
// and then: npm install -D prisma@6.19.3
// delete the node modules and run: npx prisma generate. After this, you can try running the seed again.

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
// on error, forces the node to exit
.catch((error) => {
    console.log(error);
    process.exit(1);
})
// closes the database connection
.finally(async () => {
    await prisma.$disconnect();
}); 