import type { ClassesDTO, ClassDTO, assignCompetencyDTO, editClass, CreateClassDTO, ClassResponse } from "../Types/class";
import api from "./api";

// Get all classes
export async function getClasses(): Promise<ClassesDTO[]> {
    const response = await api.get("/classes");
    return response.data.response;
}

// Get a class by ID
export async function getClassById(id: number): Promise<ClassDTO> {
    const response = await api.get(`/class/${id}`);
    return response.data.response;
}

// Create a new class
export async function createClassService(data: CreateClassDTO) : Promise<ClassResponse> {
    const response = await api.post("/class/create", data);
    return response.data.response;
}

// Update a class
export async function updateClass(id: number, data: editClass) {
    const response = await api.put(`/class/edit/${id}`, data);
    return response.data.response;
}

// Delete a class
export async function deleteClass(id: number) {
    const response = await api.delete(`/class/delete/${id}`);
    return response.data;
}

// Get all materials from a class
export async function getClassMaterials(id: number) {
    const response = await api.get(`/class/${id}/materials`);
    return response.data;
}

// Get all competences from a class
export async function getClassCompetences(id: number) {
    const response = await api.get(`/class/${id}/competences`);
    return response.data;
}

// Download class content
export async function downloadClassContent(id: number): Promise<Blob> {
    const response = await api.get<Blob>(`/class/${id}/content/download`, {
        responseType: "blob",
    });

    return response.data;
}

// Assign a competence to a class
export async function assignCompetence(data: assignCompetencyDTO) {
    const response = await api.put("/class/assigncompetence", data);
    return response.data;
}