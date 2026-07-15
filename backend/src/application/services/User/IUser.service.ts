import { registerAdminDTO, registerInstructorDTO, registerStudentDTO, showAdminDTO, showInstructorDTO, showStudentDTO, updateAdminDTO, updateInstructorDTO, updateStudentDTO } from "#application/dtos/userDTO.js";
import { Admin, Instructor, Student } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IUserService {
    registerStudent(data: registerStudentDTO): Promise<Student>
    registerInstructor(data: registerInstructorDTO): Promise<Instructor>
    registerAdmin(data: registerAdminDTO): Promise<Admin>
    showStudents(): Promise<Student[]>
    showInstructors(): Promise<Instructor[]>
    showAdmins(): Promise<Admin[]>
    showStudent(id: number): Promise<showStudentDTO | null>
    showInstructor(id: number): Promise<showInstructorDTO | null>
    showAdmin(id: number): Promise<showAdminDTO | null>
    updateStudent(id: number, data: updateStudentDTO): Promise<Student>
    updateInstructor(id: number, data: updateInstructorDTO): Promise<Instructor>
    updateAdmin(id: number, data: updateAdminDTO): Promise<Admin>
    deleteStudent(id: number): Promise<boolean>
    deleteInstructor(id: number): Promise<boolean>
    deleteAdmin(id: number): Promise<boolean>
}