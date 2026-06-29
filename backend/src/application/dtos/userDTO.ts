import { UserType } from "../../infrastructure/src/generated/prisma/enums.js"

export interface registerStudentDTO {
    name: string
    username: string
    password: string
    userType: UserType
    course: string
}