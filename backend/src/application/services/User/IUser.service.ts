import { changePasswordDTO, loginPayloadDTO, loginResponseDTO, registerAdminDTO, registerInstructorDTO, registerStudentDTO, showAdminDTO, showInstructorDTO, showStudentDTO, updateAdminDTO, updateInstructorDTO, updateStudentDTO } from "#application/dtos/userDTO.js";
import { Admin, Instructor, Student, UserType } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IUserService {
    registerStudent(data: registerStudentDTO, userId: number): Promise<Student>
    registerInstructor(data: registerInstructorDTO, userId: number): Promise<Instructor>
    registerAdmin(data: registerAdminDTO, userId: number): Promise<Admin>
    login(data: loginPayloadDTO): Promise<loginResponseDTO>
    changePassword( data: changePasswordDTO, userId: number, userType: UserType ): Promise<boolean>
    showStudents(): Promise<number[]>
    showInstructors(): Promise<number[]>
    showAdmins(): Promise<number[]>
    showStudent(id: number): Promise<showStudentDTO>
    showInstructor(id: number): Promise<showInstructorDTO>
    showAdmin(id: number): Promise<showAdminDTO>
    updateStudent(id: number, data: updateStudentDTO, userId: number): Promise<Student>
    updateInstructor(id: number, data: updateInstructorDTO, userId: number): Promise<Instructor>
    updateAdmin(id: number, data: updateAdminDTO, userId: number): Promise<Admin>
    deleteStudent(id: number, userId: number): Promise<boolean>
    deleteInstructor(id: number, userId: number): Promise<boolean>
    deleteAdmin(id: number, userId: number): Promise<boolean>
    isAdmin(userId: number): Promise<boolean>
    getUsername(userId: number): Promise<string>
}