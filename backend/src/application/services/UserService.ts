import { prisma } from "../../infrastructure/lib/prisma.js";
import { registerInstrutorDTO, registerStudentDTO, showInstrutorDTO, showStudentDTO } from "../dtos/userDTO.js";

export const registerStudent = async (data: registerStudentDTO) => {
    const { name, username, password, userType, course } = data
    const createdAt = Date.now()

    prisma.Student.create({
        data: { name, createdAt, username, password, userType, course }
    })
}

export const registerInstrutor = async (data: registerInstrutorDTO) => {
    const { name, username, password, userType, specialty, active } = data
    const createdAt = Date.now()

    prisma.Student.create({
        data: { name, createdAt, username, password, userType, specialty, active }
    })
}

export const showStudents = async () => {
    return await prisma.Student.findMany()
}

export const showInstructors = async () => {
    return await prisma.Instrutor.findMany()
}

export const showStudent = async (id: number, data: showStudentDTO) => {
    const { name, username, userType, course } = data

    return await prisma.Student.find({
        where: {
            id: id
        },
        data: {
            name: name,
            username: username,
            userType: userType,
            course: course
        }  
    })
}

export const showInstructor = async (id: number, data: showInstrutorDTO) => {
    const { name, username, userType, specialty, active } = data

    return await prisma.Instrutor.find({
        where: {
            id: id
        },
        data: {
            name: name,
            username: username,
            userType: userType,
            specialty: specialty,
            active: active
        }  
    })
}