import { Specialties, UserType } from "../../infrastructure/src/generated/prisma/enums.js"
import { UploadedFile } from "./attachmentDTO.js"

// used to create a student
export interface registerStudentDTO {
    username: string
    password: string
    repeatPassword: string
    userType: UserType
}

// used to create an instructor
export interface registerInstructorDTO {
    username: string
    password: string
    repeatPassword: string
    userType: UserType
    specialty: Specialties
}

// used to create an admin
export interface registerAdminDTO {
    username: string
    password: string
    repeatPassword: string
    userType: UserType
    specialty: Specialties
}

// used to do login
export interface loginPayloadDTO {
    username: string
    password: string
}

// response to login
export interface loginResponseDTO {
    token: string
    mustChangePassword: boolean
    user:{
        id: number;
        username: string;
        userType: UserType;
    }
}

export interface resetPasswordDTO {
    newPassword: string;
    repeatPassword: string;
    userType: UserType;
}

export interface changePasswordDTO {
    oldPassword: string;
    newPassword: string;
    repeatPassword: string
}

export interface showStudentDTO {
    id: number
    username: string
    userType: UserType
}

// response to showInstructor service
export interface showInstructorDTO {
    id: number
    username: string
    userType: UserType
    specialty: Specialties
    active: boolean
    attachmentId: string | null
}

// response to showAdmin service
export interface showAdminDTO {
    id: number
    username: string
    userType: UserType
    specialty: Specialties
    active: boolean
    attachmentId: string | null
}

// used to edit student
export interface updateStudentDTO {
    username: string
    password: string
    
}

// used to edit instructor
export interface updateInstructorDTO {
    username: string
    password: string
    specialty: Specialties
    active: boolean
    file: UploadedFile
}

// used to edit admin
export interface updateAdminDTO {
    username: string
    password: string
    specialty: Specialties
    active: boolean
    file: UploadedFile
}

export interface showAllDTO {
    students: {
        id: number
        username: string
        userType: UserType
    }[] | null,
    instructors: {
        id: number
        username: string
        userType: UserType
        specialty: Specialties
        active: boolean
        attachmentId: string | null
    }[] | null,
    admins: {
        id: number
        username: string
        userType: UserType
        specialty: Specialties
        active: boolean
        attachmentId: string | null
    }[] | null
}