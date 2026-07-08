import { registerInstructorDTO, registerStudentDTO, showInstructorDTO, showStudentDTO, updateInstructorDTO, updateStudentDTO } from "#application/dtos/userDTO.js";
import { Instructor, Student } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IUserService {
    registerStudent(data: registerStudentDTO): Promise<Student>
    registerInstructor(data: registerInstructorDTO): Promise<Instructor>
    showStudents(): Promise<Student[]>
    showInstructors(): Promise<Instructor[]>
    showStudent(id: number): Promise<showStudentDTO | null>
    showInstructor(id: number): Promise<showInstructorDTO | null>
    updateStudent(id: number, data: updateStudentDTO): Promise<Student>
    updateInstructor(id: number, data: updateInstructorDTO): Promise<Instructor>
    deleteStudent(id: number): Promise<void>
    deleteInstructor(id: number): Promise<void>
}