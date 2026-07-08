import { registerInstructorDTO, registerStudentDTO, showInstructorDTO, showStudentDTO, updateInstructorDTO, updateStudentDTO } from "#application/dtos/userDTO.js";
import { IUserService } from "#application/services/User/IUser.service.js";
import { Student, Instructor } from "#infrastructure/prisma/generated/prisma/client.js";
import { connect } from "node:http2";
import { prisma } from "../../lib/prisma.js";
import { AttachmentService } from "../Attachment/AttachmentService.js";

// adicionar upload de fotos depois de implementar o service dos arquivos

export class UserService implements IUserService {
    constructor(private attachmentService: AttachmentService) {}

    async registerStudent(data: registerStudentDTO): Promise<Student> {
        const { name, username, password, userType, course, file, instructorId } = data
        const attachmentId = await this.attachmentService.upload(file)

        return await prisma.student.create({
            data: { name, username, password, userType, course, attachmentId, instructorId} 
        })
    }

    async registerInstructor(data: registerInstructorDTO): Promise<Instructor> {
        const { name, username, password, userType, specialty, active, file } = data
        const attachmentId = await this.attachmentService.upload(file)

        return await prisma.instructor.create({
            data: { name, username, password, userType, specialty, active, attachmentId }
        })
    }

    async showStudents(): Promise<Student[]> {
        return await prisma.student.findMany()
    }

    async showInstructors(): Promise<Instructor[]> {
        return await prisma.instructor.findMany()
    }

    async showStudent(id: number): Promise<showStudentDTO | null> {
        return await prisma.student.findFirst({
            where: {
                id: id
            },
            select: {
                name: true,
                username: true,
                userType: true,
                course: true
            }
        })
    }

    async showInstructor(id: number): Promise<showInstructorDTO | null> {
        return await prisma.instructor.findFirst({
            where: {
                id: id
            },
            select: {
                name: true,
                username: true,
                userType: true,
                specialty: true,
                active: true
            }  
        })
    }

    async updateStudent(id: number, data: updateStudentDTO): Promise<Student> {
        const { name, username, password, course } = data

        return await prisma.student.update({
            where: {
                id: id
            },
            data: {
                name: name,
                username: username,
                password: password,
                course: course
            }
        })
    }

    async updateInstructor(id: number, data: updateInstructorDTO): Promise<Instructor> {
        const { name, username, password, specialty, active } = data

        return await prisma.instructor.update({
            where: {
                id: id
            },
            data: {
                name: name,
                username: username,
                password: password,
                specialty: specialty,
                active: active
            }
        })
    }

    async deleteStudent(id: number): Promise<void> {
        await prisma.student.delete({
            where: {
                id: id
            }
        })
    }

    async deleteInstructor(id: number): Promise<void> {
        await prisma.instructor.delete({
            where: {
                id: id
            }
        })
    }

}