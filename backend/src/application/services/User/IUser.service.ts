import { loginPayloadDTO, loginResponseDTO, registerAdminDTO, registerInstructorDTO, registerStudentDTO, showAdminDTO, showInstructorDTO, showStudentDTO, updateAdminDTO, updateInstructorDTO, updateStudentDTO } from "#application/dtos/userDTO.js";
import { Admin, Instructor, Student } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IUserService {
    registerStudent(data: registerStudentDTO, userId: number): Promise<Student>
    registerInstructor(data: registerInstructorDTO, userId: number): Promise<Instructor>
    registerAdmin(data: registerAdminDTO, userId: number): Promise<Admin>
    login(data: loginPayloadDTO): Promise<loginResponseDTO>
    showStudents(): Promise<Student[]>
    showInstructors(): Promise<Instructor[]>
    showAdmins(): Promise<Admin[]>
    showStudent(id: number): Promise<showStudentDTO | null>
    showInstructor(id: number): Promise<showInstructorDTO | null>
    showAdmin(id: number): Promise<showAdminDTO | null>
    updateStudent(id: number, data: updateStudentDTO, userId: number): Promise<Student>
    updateInstructor(id: number, data: updateInstructorDTO, userId: number): Promise<Instructor>
    updateAdmin(id: number, data: updateAdminDTO, userId: number): Promise<Admin>
    deleteStudent(id: number, userId: number): Promise<boolean>
    deleteInstructor(id: number, userId: number): Promise<boolean>
    deleteAdmin(id: number, userId: number): Promise<boolean>
    isAdmin(userId: number): Promise<boolean>
}