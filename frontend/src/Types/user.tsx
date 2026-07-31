import type { UploadedFile } from "./attachment.js"

export type UserType = "ADMIN" | "INSTRUCTOR" | "STUDENT";

// used to create an user
export interface registerUserDTO {
    username: string
    password: string
    repeatPassword: string
    userType: UserType
}

export interface showStudentDTO {
    id: number
    username: string
    userType: UserType
}

// response to showInstructor or showAdmin service
export interface showPrivilegedUserDTO {
    id: number
    username: string
    userType: UserType
    active: boolean
    attachmentId: string | null
}

export interface updateStudentDTO {
    username: string
    password: string
    active: boolean
    
}

// used to edit instructor
export interface updateInstructorDTO {
    username: string
    password: string
    active: boolean
    file: UploadedFile
}

// used to edit admin
export interface updateAdminDTO {
    username: string
    password: string
    active: boolean
    file: UploadedFile
}

// used to reset user's password
export interface resetPasswordDTO {
    id: number
    newPassword: string
    repeatPassword: string
}

// used to edit instructor or admin
export interface updatePrivilegedUserDTO {
    username: string
    password: string
    active: boolean
    file: UploadedFile
}