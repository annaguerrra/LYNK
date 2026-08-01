import api from "./api";
import type { 
    registerUserDTO,
    showStudentDTO, 
    showPrivilegedUserDTO,
    updateStudentDTO,
    updatePrivilegedUserDTO,
    resetPasswordDTO
} from "../Types/user";


// Create a new user
export async function createUser(data: registerUserDTO) {
    const response = await api.post("/user/create", data);
    return response.data;
}

// Get all users
export async function getUsers(): Promise<showStudentDTO[]> {
    const response = await api.get("/user/showAll");
    return [
        ...response.data.response.students,
        ...response.data.response.instructors,
        ...response.data.response.admins,
    ];
}

// Get all students
export async function getStudents(): Promise<showStudentDTO[]> {
    const response = await api.get("/user/showStud");
    return response.data;
}

// Get all instructors
export async function getInstructors(): Promise<showPrivilegedUserDTO[]> {
    const response = await api.get("/user/showInst");
    return response.data;
}

// Get all admins
export async function getAdmins(): Promise<showPrivilegedUserDTO[]> {
    const response = await api.get("/user/showAdmin");
    return response.data;
}

// Get a student by ID
export async function getStudentById(id: number): Promise<showStudentDTO> {
    const response = await api.get(`/user/showStud/${id}`);
    return response.data;
}

// Get an instructor by ID
export async function getInstructorById(id: number): Promise<showPrivilegedUserDTO> {
    const response = await api.get(`/user/showInst/${id}`);
    return response.data;
}

// Get an admin by ID
export async function getAdminById(id: number): Promise<showPrivilegedUserDTO> {
    const response = await api.get(`/user/showAdmin/${id}`);
    return response.data;
}

// Update a student
export async function updateStudent(
    id: number,
    data: updateStudentDTO
) {
    const response = await api.put(`/user/updateStud/${id}`, data);
    return response.data;
}

// Update an instructor
export async function updateInstructor(
    id: number,
    data: updatePrivilegedUserDTO
) {
    const response = await api.put(`/user/updateInst/${id}`, data);
    return response.data;
}

// Update an admin
export async function updateAdmin(
    id: number,
    data: updatePrivilegedUserDTO
) {
    const response = await api.put(`/user/updateAdmin/${id}`, data);
    return response.data;
}

export async function resetPassword(
    data: resetPasswordDTO,
    id: number
){
    const response = await api.put(`user/change-password/${id}`, data);
    return response.data;
}

// Delete a student
export async function deleteStudent(id: number) {
    const response = await api.delete(`/user/deleteStud/${id}`);
    return response.data;
}

// Delete an instructor
export async function deleteInstructor(id: number) {
    const response = await api.delete(`/user/deleteInst/${id}`);
    return response.data;
}

// Delete an admin
export async function deleteAdmin(id: number) {
    const response = await api.delete(`/user/deleteAdmin/${id}`);
    return response.data;
}