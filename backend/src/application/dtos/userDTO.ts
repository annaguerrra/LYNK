import { Specialties, UserType } from "../../infrastructure/src/generated/prisma/enums.js"

export interface registerStudentDTO {
    name: string
    username: string
    password: string
    userType: UserType
    course: string
}

export interface registerInstrutorDTO {
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

export interface showInstrutorDTO {
    name: string
    username: string
    userType: UserType
    specialty: Specialties
    active: boolean
}