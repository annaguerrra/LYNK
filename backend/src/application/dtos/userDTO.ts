import { Specialties, UserType } from "../../infrastructure/src/generated/prisma/enums.js"
import { UploadedFile } from "./attachmentDTO.js"

export interface registerStudentDTO {
    name: string
    username: string
    password: string
    userType: UserType
    course: string
    file: UploadedFile
    instructorId: number
}

export interface registerInstructorDTO {
    name: string
    username: string
    password: string
    userType: UserType
    specialty: Specialties
    active: boolean
    file: UploadedFile
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