import { prisma } from "../../infrastructure/lib/prisma.js";
import { registerInstructorDTO, registerStudentDTO, showInstructorDTO, showStudentDTO, updateInstructorDTO, updateStudentDTO } from "../dtos/userDTO.js";

export const registerStudent = async (data: registerStudentDTO) => {
    const { name, username, password, userType, course } = data
    const createdAt = Date.now()

    prisma.Student.create({
        data: { name, createdAt, username, password, userType, course }
    })
}

export const registerInstructor = async (data: registerInstructorDTO) => {
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

export const showInstructor = async (id: number, data: showInstructorDTO) => {
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

export const deleteStudent = async(id: number) => {
    return await prisma.Student.delete({
        where: {
            id: id
        }
    })
}

export const deleteInstructor = async(id: number) => {
    return await prisma.Instructor.delete({
        where: {
            id: id
        }
    })
}

export const updateStudent = async(id: number, data: updateStudentDTO) => {
    const { name, username, password, course } = data

    return await prisma.Student.update({
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

    return await prisma.Student.update({
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