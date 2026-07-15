import { registerAdminDTO, registerInstructorDTO, registerStudentDTO, showAdminDTO, showInstructorDTO, showStudentDTO, updateAdminDTO, updateInstructorDTO, updateStudentDTO } from "#application/dtos/userDTO.js";
import { IUserService } from "#application/services/User/IUser.service.js";
import { Student, Instructor, Admin } from "#infrastructure/prisma/generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import { AttachmentService } from "../Attachment/AttachmentService.js";

export class UserService implements IUserService {
    constructor(private attachmentService: AttachmentService) {}

    async registerStudent(data: registerStudentDTO): Promise<Student> {
        const { username, password, userType } = data

        return await prisma.student.create({
            data: { username, password, userType } 
        })
    }

    async registerInstructor(data: registerInstructorDTO): Promise<Instructor> {
        const { username, password, userType, specialty, file } = data
        const attachmentId = await this.attachmentService.upload(file)

        try {
            const createdUser = await prisma.instructor.create({
                data: { username, password, userType, specialty, attachmentId }
            })

            // await prisma.log.create({
            //     data: {
            //         action: "CREATED",
            //         entityType: "Instructor",
            //         entityId: createdUser.id,
            //         oldData: {},
            //         newData: {
            //             ...createdUser
            //         }
            //     }
            // })

            return createdUser

        } catch (e) {
            await this.attachmentService.delete(attachmentId)
            throw e
        }

    }

    async registerAdmin(data: registerAdminDTO): Promise<Admin> {
        const { username, password, userType, specialty, file } = data
        const attachmentId = await this.attachmentService.upload(file)

        try {
            const createdUser = await prisma.admin.create({
                data: { username, password, userType, specialty, attachmentId }
            })

            // log

            return createdUser

        } catch (e) {
            await this.attachmentService.delete(attachmentId)
            throw e
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

    async updateStudent(id: number, data: updateStudentDTO): Promise<Student> {
        const { username, password } = data

        return await prisma.student.update({
            where: {
                id: id
            },
            data: {
                username: username,
                password: password,
            }
        })
    }

    async updateInstructor(id: number, data: updateInstructorDTO): Promise<Instructor> {
        const { username, password, specialty, active, file } = data
        const attachmentId = await this.attachmentService.upload(file)

        const target = await prisma.instructor.findUnique({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("User not found")

        await this.attachmentService.delete(target?.attachmentId)

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

        // log

        return updatedUser
    }

    async updateAdmin(id: number, data: updateAdminDTO): Promise<Admin> {
        const { username, password, specialty, active, file } = data
        const attachmentId = await this.attachmentService.upload(file)

        const target = await prisma.admin.findUnique({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("User not found")

        await this.attachmentService.delete(target?.attachmentId)

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

        // log

        return updatedUser
    }

    async deleteStudent(id: number): Promise<boolean> {
        await prisma.student.delete({
            where: {
                id: id
            }
        })

        return true
    }

    async deleteInstructor(id: number): Promise<boolean> {
        await prisma.instructor.delete({
            where: {
                id: id
            }
        })

        return true
    }

    async deleteAdmin(id: number): Promise<boolean> {
        await prisma.admin.delete({
            where: {
                id: id
            }
        })

        return true
    }

}