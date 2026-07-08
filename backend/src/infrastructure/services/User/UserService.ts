import { registerInstructorDTO, registerStudentDTO, showInstructorDTO, showStudentDTO, updateInstructorDTO, updateStudentDTO } from "#application/dtos/userDTO.js";
import { prisma } from "../../lib/prisma.js";
import { AttachmentService } from "../Attachment/AttachmentService.js";

// adicionar upload de fotos depois de implementar o service dos arquivos

export const registerStudent = async (data: registerStudentDTO) => {
    const { name, username, password, userType, course } = data
    const createdAt = Date.now().toString()

    prisma.student.create({
        data: { name, createdAt, username, password, userType, course }
    })
}

export const registerInstructor = async (data: registerInstructorDTO) => {
    const { name, username, password, userType, specialty, active } = data
    const createdAt = Date.now().toString()

    prisma.instructor.create({
        data: { name, createdAt, username, password, userType, specialty, active }
    })
}

export const showStudents = async () => {
    return await prisma.student.findMany()
}

export const showInstructors = async () => {
    return await prisma.instructor.findMany()
}

export const showStudent = async (id: number) => {

    return await prisma.student.findUnique({
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

export const showInstructor = async (id: number) => {

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

export const deleteStudent = async(id: number) => {
    return await prisma.student.delete({
        where: {
            id: id
        }
    })
}

export const deleteInstructor = async(id: number) => {
    return await prisma.instructor.delete({
        where: {
            id: id
        }
    })
}

export const updateStudent = async(id: number, data: updateStudentDTO) => {
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

export const updateInstructor = async(id: number, data: updateInstructorDTO) => {
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