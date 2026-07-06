import { Specialties, UserType } from "../../infrastructure/src/generated/prisma/enums.js"

export interface registerStudentDTO {
    name: string
    username: string
    password: string
    userType: UserType
    course: string
}

export interface registerInstructorDTO {
    name: string
    username: string
    password: string
    userType: UserType
    specialty: Specialties
    active: boolean
}

export interface showStudentDTO {
    name: string
    username: string
    userType: UserType
    course: string
}

export interface showInstructorDTO {
    name: string
    username: string
    userType: UserType
    specialty: Specialties
    active: boolean
}

export interface updateStudentDTO {
    name: string
    username: string
    password: string
    course: string
}

export interface updateInstructorDTO {
    name: string
    username: string
    password: string
    specialty: Specialties
    active: boolean
}