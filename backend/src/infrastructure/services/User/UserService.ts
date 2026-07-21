import { loginPayloadDTO, loginResponseDTO, registerAdminDTO, registerInstructorDTO, registerStudentDTO, showAdminDTO, showInstructorDTO, showStudentDTO, updateAdminDTO, updateInstructorDTO, updateStudentDTO } from "#application/dtos/userDTO.js";
import { IUserService } from "#application/services/User/IUser.service.js";
import { Student, Instructor, Admin } from "#infrastructure/prisma/generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import { AttachmentService } from "../Attachment/AttachmentService.js";

export class UserService implements IUserService {
    constructor(private attachmentService: AttachmentService) {}

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

    async registerStudent(data: registerStudentDTO, userId: number): Promise<Student> {
        const { username, password, userType } = data
        const isAdmin = await this.isAdmin(userId) 

        const createdUser = await prisma.student.create({
            data: { username, password, userType } 
        })

        await prisma.log.create({
            data: {
                action: "CREATED",
                entityType: "Student",
                entityId: createdUser.id,
                oldData: {},
                newData: {
                    ...createdUser
                },
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        })

        return createdUser
    }

    async registerInstructor(data: registerInstructorDTO, userId: number): Promise<Instructor> {
        const { username, password, userType, specialty } = data

        const createdUser = await prisma.instructor.create({
            data: { username, password, userType, specialty }
        })

        await prisma.log.create({
            data: {
                action: "CREATED",
                entityType: "Instructor",
                entityId: createdUser.id,
                oldData: {},
                newData: {
                    ...createdUser
                },
                adminId: userId                    
            }
        })

        return createdUser

    }

    async registerAdmin(data: registerAdminDTO, userId: number): Promise<Admin> {
        const { username, password, userType, specialty } = data

        const createdUser = await prisma.admin.create({
            data: { username, password, userType, specialty }
        })

        await prisma.log.create({
            data: {
                action: "CREATED",
                entityType: "Admin",
                entityId: createdUser.id,
                oldData: {},
                newData: {
                    ...createdUser
                },
                adminId: userId
            }
        })

        return createdUser

    }

    async login(data: loginPayloadDTO): Promise<loginResponseDTO> {
        const { username, password } = data;

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

        if(student){
            user = {
                id: student.id,
                username: student.username,
                userType: student.userType,
                active: student.active

                
            }
        }
    }

    async showStudents(): Promise<Student[]> {
        return await prisma.student.findMany()
    }

    async showInstructors(): Promise<Instructor[]> {
        return await prisma.instructor.findMany()
    }

    async showAdmins(): Promise<Admin[]> {
        return await prisma.admin.findMany()
    }

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

    async updateStudent(id: number, data: updateStudentDTO, userId: number): Promise<Student> {
        const { username, password } = data
        const isAdmin = await this.isAdmin(userId) 
       
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
                oldData: {
                    ...target
                },
                newData: {
                    ...updatedUser
                },
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        })

        return updatedUser
    }

    async updateInstructor(id: number, data: updateInstructorDTO, userId: number): Promise<Instructor> {
        const { username, password, specialty, active, file } = data
        const attachmentId = await this.attachmentService.upload(file)
        const isAdmin = await this.isAdmin(userId)

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
                    oldData: {
                        ...target
                    },
                    newData: {
                        ...updatedUser
                    },
                    ...(isAdmin && { adminId: userId }),
                    ...(!isAdmin && { instructorId: userId }),
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
                    oldData: {
                        ...target
                    },
                    newData: {
                        ...updatedUser
                    },
                    adminId: userId
                }
            })

            return updatedUser

        } catch (e) {
            await this.attachmentService.delete(attachmentId)
            throw e
        }
    }

    async deleteStudent(id: number, userId: number): Promise<boolean> {
        const isAdmin = await this.isAdmin(userId)
        
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
                oldData: {
                    ...target
                },
                newData: {},
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        })

        return true
    }

    async deleteInstructor(id: number, userId: number): Promise<boolean> {
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
                oldData: {
                    ...target
                },
                newData: {},
                adminId: userId
            }
        })

        return true
    }

    async deleteAdmin(id: number, userId: number): Promise<boolean> {
        
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
                oldData: {
                    ...target
                },
                newData: {},
                adminId: userId
            }
        })

        return true
    }

}