import { prisma } from "../../infrastructure/lib/prisma.js";
import { registerStudentDTO } from "../dtos/userDTO.js";

export const registerStudent = async (data: registerStudentDTO) => {
    const { name, username, password, userType, course } = data
    prisma.Student.create({})
}