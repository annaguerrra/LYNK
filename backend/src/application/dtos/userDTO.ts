import { Specialties, UserType } from "../../infrastructure/src/generated/prisma/enums.js"
import { UploadedFile } from "./attachmentDTO.js"

export interface registerStudentDTO {
    username: string
    password: string
    userType: UserType
}

export interface registerInstructorDTO {
    username: string
    password: string
    userType: UserType
    specialty: Specialties
    file: UploadedFile
}

export interface registerAdminDTO {
    username: string
    password: string
    userType: UserType
    specialty: Specialties
    file: UploadedFile
}

export interface showStudentDTO {
    username: string
    userType: UserType
}

export interface showInstructorDTO {
    username: string
    userType: UserType
    specialty: Specialties
    active: boolean
    attachmentId: string
}

export interface showAdminDTO {
    username: string
    userType: UserType
    specialty: Specialties
    active: boolean
    attachmentId: string
}

export interface updateStudentDTO {
    username: string
    password: string
}

export interface updateInstructorDTO {
    username: string
    password: string
    specialty: Specialties
    active: boolean
    file: UploadedFile
}

export interface updateAdminDTO {
    username: string
    password: string
    specialty: Specialties
    active: boolean
    file: UploadedFile
}