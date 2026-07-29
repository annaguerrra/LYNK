import type { UploadedFileDTO } from "./attachment.js"

export type UserType = "ADMIN" | "INSTRUCTOR" | "STUDENT";

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
}

// used to create an admin
export interface registerAdminDTO {
    username: string
    password: string
    repeatPassword: string
    userType: UserType
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

export interface changePasswordDTO {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string
}

export interface showStudentDTO {
    username: string
    userType: UserType
}

// response to showInstructor service
export interface showInstructorDTO {
    username: string
    userType: UserType
    active: boolean
    attachmentId: string | null
}

// response to showAdmin service
export interface showAdminDTO {
    username: string
    userType: UserType
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
    active: boolean
    file: UploadedFileDTO
}

// used to edit admin
export interface updateAdminDTO {
    username: string
    password: string
    active: boolean
    file: UploadedFileDTO
}