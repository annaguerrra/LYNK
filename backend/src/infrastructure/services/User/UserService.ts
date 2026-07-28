import { changePasswordDTO, loginPayloadDTO, loginResponseDTO, registerAdminDTO, registerInstructorDTO, registerStudentDTO, showAdminDTO, showInstructorDTO, showStudentDTO, updateAdminDTO, updateInstructorDTO, updateStudentDTO } from "#application/dtos/userDTO.js";
import { IUserService } from "#application/services/User/IUser.service.js";
import { Student, Instructor, Admin, UserType } from "#infrastructure/prisma/generated/prisma/client.js";
import { Error } from "mongoose";
import { prisma } from "../../lib/prisma.js";
import { AttachmentService } from "../Attachment/AttachmentService.js";
import { HashService } from "../Authetication/Hash.service.js";
import { JwtTokenService } from "../Authetication/JwtToken.service.js";

export class UserService implements IUserService {
    constructor(
        private attachmentService: AttachmentService,
        private hashService: HashService,
        private jwtTokenService: JwtTokenService
    ) {}
    
    // identifies wheter the user is an admin or not by searching its id on admin table
    async isAdmin(userId: number): Promise<boolean> {
        const admin = await prisma.admin.findUnique({
            where: {
                id: userId
            }
        })
        
        if(!admin)
            return false
        
        return true
    }

    async getUsername(userId: number): Promise<string> {
        const user =
            await prisma.admin.findUnique({
                where: { id: userId }
            }) ??
            await prisma.instructor.findUnique({
                where: { id: userId }
            });

        if (!user)
            throw new Error("User not found")

        return user.username
    }
    
    // creates a new student and register it in log table
    async registerStudent(data: registerStudentDTO, userId: number): Promise<Student> {
        const { username, password, userType } = data
        const isAdmin = await this.isAdmin(userId)
        const ownerUsername = await this.getUsername(userId)

        const hashedPassword = await this.hashService.hash(data.password);

        const createdUser = await prisma.student.create({
            data: { username, password: hashedPassword, userType } 
        })
        
        await prisma.log.create({
            data: {
                action: "CREATED",
                entityType: "Student",
                entityId: createdUser.id,
                entityName: createdUser.username,
                oldData: {},
                newData: {
                    ...createdUser
                },
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: ownerUsername
            }
        })
        
        return createdUser
    }
    
    // creates a new instructor and registers in the log table
    async registerInstructor(data: registerInstructorDTO, userId: number): Promise<Instructor> {
        const { username, password, userType, specialty } = data
        const ownerUsername = await this.getUsername(userId)
        
        const hashedPassword = await this.hashService.hash(data.password);

        const createdUser = await prisma.instructor.create({
            data: { username, password: hashedPassword, userType, specialty } 
        })
        
        await prisma.log.create({
            data: {
                action: "CREATED",
                entityType: "Instructor",
                entityId: createdUser.id,
                entityName: createdUser.username,
                oldData: {},
                newData: {
                    ...createdUser
                },
                adminId: userId,
                username: ownerUsername                
            }
        })
        
        return createdUser
        
    }
    
    // creates a new admin and registers in the log table
    async registerAdmin(data: registerAdminDTO, userId: number): Promise<Admin> {
        const { username, password, userType, specialty } = data
        const ownerUsername = await this.getUsername(userId)
        
        const hashedPassword = await this.hashService.hash(data.password);

        const createdUser = await prisma.admin.create({
            data: { username, password: hashedPassword, userType, specialty } 
        })
        
        await prisma.log.create({
            data: {
                action: "CREATED",
                entityType: "Admin",
                entityId: createdUser.id,
                entityName: createdUser.username,
                oldData: {},
                newData: {
                    ...createdUser
                },
                adminId: userId,
                username: ownerUsername
            }
        })
        
        return createdUser
        
    }
    
    // login service. It does multiple searchs at same time, it tries to find the userId in user, admin and instructor
    async login(data: loginPayloadDTO): Promise<loginResponseDTO> {
        const { username } = data;
        
        // Searches for the user in all user tables
        const [student, instructor, admin] = await Promise.all([
            prisma.student.findUnique({
                where: {
                    username: username
                }
            }),
            
            prisma.instructor.findUnique({
                where:{
                    username: username
                }
            }),
            
            prisma.admin.findUnique({
                where: {
                    username: username
                }
            })
        ]);
        
        let user;
        
        // normalizes the found user into the same structure
        if(student){
            user = {
                id: student.id,
                username: student.username,
                password: student.password,
                userType: student.userType,
                active: student.active,
                firstAccess: student.firstAccess,
                updatedPasswordAt: student.updatedPasswordAt
                
            }
        }
        else if(instructor){
            user = {
                id: instructor.id,
                username: instructor.username,
                password: instructor.password,
                userType: instructor.userType,
                specialty: instructor.specialty,
                active: instructor.active,
                firstAccess: instructor.firstAccess,
                updatedPasswordAt: instructor.updatedPasswordAt
            }
        }
        
        else if(admin){
            user = {
                id: admin.id,
                username: admin.username,
                password: admin.password,
                userType: admin.userType,
                specialty: admin.specialty,
                active: admin.active,
                firstAccess: admin.firstAccess,
                updatedPasswordAt: admin.updatedPasswordAt
            }
        }
        else {
            throw new Error("Invalid Username or Password");
        }

        if(!user.active && !user.firstAccess) {
            throw new Error("User Inactive.");
        }

        // // checks whether the user must change their password
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() - 1);
        
        const mustChangePassword = user.firstAccess || user.updatedPasswordAt < expirationDate;
        
        
        // compares the provided password with the stored hashed password

        const comparison = await this.hashService.compare(data.password, user.password)

        if(!comparison) {
            throw new Error("Invalid Username or Password");
        }
        
        // if the passwords match, a JWT token is generated
        const token = this.jwtTokenService.generate({
            userId: user.id, 
            usertype: user.userType
        });    
        
        return {
            token,
            mustChangePassword: mustChangePassword,
            user:{
                id: user.id,
                username: user.username,
                userType: user.userType
            }
        };
    }
    
    async changePassword(data: changePasswordDTO, userId: number, userType: UserType): Promise<boolean> {
        const ownerUsername = await this.getUsername(userId)
        let user;

        switch (userType) {
            case UserType.STUDENT: {
                const student = await prisma.student.findUnique({
                    where: { id: userId }
                });

                if (student) {
                    user = {
                        id: student.id,
                        password: student.password,
                        userType: student.userType
                    };
                }
                break;
            }
            case UserType.INSTRUCTOR: {
                const instructor = await prisma.instructor.findUnique({
                    where: { id: userId }
                });

                if (instructor) {
                    user = {
                        id: instructor.id,
                        password: instructor.password,
                        userType: instructor.userType
                    };
                }
                break;
            }
            case UserType.ADMIN: {
                const admin = await prisma.admin.findUnique({
                    where: { id: userId }
                });

                if (admin) {
                    user = {
                        id: admin.id,
                        password: admin.password,
                        userType: admin.userType
                    };
                }
                break;
            }
            default: 
                throw new Error("User Not Found!");
        }         

        if(!user){
            throw new Error("User Not Found!"); 
        }
        
        const comparison = await this.hashService.compare(data.newPassword, user.password);

        if(comparison){
            throw new Error("Passwords do not match. Please, try again")
        }
        
        if(user.password === data.newPassword){
            throw new Error("Your new password cannot be the same as your old password. Try again")
        }

        const hashedPassword = await this.hashService.hash(data.newPassword);
        
        try{
            if(user.userType === UserType.STUDENT) {
                await prisma.student.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        password: hashedPassword,
                        active: true
                    }
                });

                await prisma.log.create({
                data: {
                    action: "UPDATED",
                    entityId: user.id,
                    entityName: user.userType,
                    entityType: "Instructor",
                    newData: hashedPassword, 
                    oldData: data.oldPassword,
                    adminId: user.id,
                    username: ownerUsername
                }})

            } 
            else if(user.userType === UserType.INSTRUCTOR) {
                await prisma.instructor.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        password: hashedPassword,
                        active: true
                    }
                });

                await prisma.log.create({
                data: {
                    action: "UPDATED",
                    entityId: user.id,
                    entityName: user.userType,
                    entityType: "Instructor",
                    newData: hashedPassword, 
                    oldData: data.oldPassword,
                    adminId: user.id,
                    username: ownerUsername
                    }
                });

            } else {
                await prisma.admin.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        password: hashedPassword,
                        active: true
                    }
                });

                await prisma.log.create({
                data: {
                    action: "UPDATED",
                    entityId: user.id,
                    entityName: user.userType,
                    entityType: "Admin",
                    newData: hashedPassword, 
                    oldData: data.oldPassword,
                    adminId: user.id,
                    username: ownerUsername
                    }
                });
            }
        } catch(e) {
            console.log(e);
        }
        return true;
    }
    
    // returns all the students/ instructors / admin registered on the database
    async showStudents(): Promise<Student[]> {
        return await prisma.student.findMany()
    }

    async showInstructors(): Promise<Instructor[]> {
        return await prisma.instructor.findMany()
    }

    async showAdmins(): Promise<Admin[]> {
        return await prisma.admin.findMany()
    }

    // returns a specific student / instructor / admin with the provided id
    async showStudent(id: number): Promise<showStudentDTO | null> {
        return await prisma.student.findFirst({
            where: {
                id: id
            },
            select: {
                username: true,
                userType: true,
            }
        })
    }

    async showInstructor(id: number): Promise<showInstructorDTO | null> {
        return await prisma.instructor.findFirst({
            where: {
                id: id
            },
            select: {
                username: true,
                userType: true,
                specialty: true,
                active: true,
                attachmentId: true
            }  
        })
    }

    async showAdmin(id: number): Promise<showAdminDTO | null> {
        return await prisma.admin.findFirst({
            where: {
                id: id
            },
            select: {
                username: true,
                userType: true,
                specialty: true,
                active: true,
                attachmentId: true
            }  
        })
    }

    // updates the user information by searching its id, updating the prisma information and creating a new log
    async updateStudent(id: number, data: updateStudentDTO, userId: number): Promise<Student> {
        const { username, password } = data
        const isAdmin = await this.isAdmin(userId)
        const ownerUsername = await this.getUsername(userId)
       
        const target = await prisma.student.findUnique({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("User not found")

        const updatedUser = await prisma.student.update({
            where: {
                id: id
            },
            data: {
                username: username,
                password: password,
            }
        })

        await prisma.log.create({
            data: {
                action: "UPDATED",
                entityType: "Student",
                entityId: target.id,
                entityName: target.username,
                oldData: {
                    ...target
                },
                newData: {
                    ...updatedUser
                },
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: ownerUsername
            }
        })

        return updatedUser
    }

    async updateInstructor(id: number, data: updateInstructorDTO, userId: number): Promise<Instructor> {
        const { username, password, specialty, active, file } = data
        const attachmentId = await this.attachmentService.upload(file)
        const ownerUsername = await this.getUsername(userId)

        const target = await prisma.instructor.findUnique({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("User not found")

        if (target.attachmentId)
            await this.attachmentService.delete(target?.attachmentId)

        try {
            const updatedUser = await prisma.instructor.update({
                where: {
                    id: id
                },
                data: {
                    username: username,
                    password: password,
                    specialty: specialty,
                    active: active,
                    attachmentId: attachmentId
                }
            })
    
            await prisma.log.create({
                data: {
                    action: "UPDATED",
                    entityType: "Instructor",
                    entityId: target.id,
                    entityName: target.username,
                    oldData: {
                        ...target
                    },
                    newData: {
                        ...updatedUser
                    },
                    adminId: userId,
                    username: ownerUsername
                }
            })

            return updatedUser

        } catch (e) {
            await this.attachmentService.delete(attachmentId)
            throw e
        }

    }

    async updateAdmin(id: number, data: updateAdminDTO, userId: number): Promise<Admin> {
        const { username, password, specialty, active, file } = data
        const ownerUsername = await this.getUsername(userId)
        const attachmentId = await this.attachmentService.upload(file)

        const target = await prisma.admin.findUnique({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("User not found")

        if(target.attachmentId)
            await this.attachmentService.delete(target?.attachmentId)

        try {
            const updatedUser = await prisma.admin.update({
                where: {
                    id: id
                },
                data: {
                    username: username,
                    password: password,
                    specialty: specialty,
                    active: active,
                    attachmentId: attachmentId
                }
            })

            await prisma.log.create({
                data: {
                    action: "UPDATED",
                    entityType: "Admin",
                    entityId: target.id,
                    entityName: target.username,
                    oldData: {
                        ...target
                    },
                    newData: {
                        ...updatedUser
                    },
                    adminId: userId,
                    username: ownerUsername
                }
            })

            return updatedUser

        } catch (e) {
            await this.attachmentService.delete(attachmentId)
            throw e
        }
    }
    
    // deletes the user information based on the provided id, this action is registered in the log table
    async deleteStudent(id: number, userId: number): Promise<boolean> {
        const isAdmin = await this.isAdmin(userId)
        const ownerUsername = await this.getUsername(userId)
        
        const target = await prisma.student.findUnique({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("User not found")
        
        await prisma.student.delete({
            where: {
                id: id
            }
        })

        await prisma.log.create({
            data: {
                action: "DELETED",
                entityType: "Student",
                entityId: target.id,
                entityName: target.username,
                oldData: {
                    ...target
                },
                newData: {},
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: ownerUsername
            }
        })

        return true
    }

    async deleteInstructor(id: number, userId: number): Promise<boolean> {
        const ownerUsername = await this.getUsername(userId)
        const target = await prisma.instructor.findUnique({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("User not found")
        
        await prisma.instructor.delete({
            where: {
                id: id
            }
        })

        await prisma.log.create({
            data: {
                action: "DELETED",
                entityType: "Instructor",
                entityId: target.id,
                entityName: target.username,
                oldData: {
                    ...target
                },
                newData: {},
                adminId: userId,
                username: ownerUsername
            }
        })

        return true
    }

    async deleteAdmin(id: number, userId: number): Promise<boolean> {
        const ownerUsername = await this.getUsername(userId)
        
        const target = await prisma.admin.findUnique({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("User not found")
        
        await prisma.admin.delete({
            where: {
                id: id
            }
        })

        await prisma.log.create({
            data: {
                action: "DELETED",
                entityType: "Admin",
                entityId: target.id,
                entityName: target.username,
                oldData: {
                    ...target
                },
                newData: {},
                adminId: userId,
                username: ownerUsername
            }
        })

        return true
    }

}