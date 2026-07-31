import type { registerExamDTO, updateExamDTO } from "../Types/exam";
import type { AttachFileDTO } from "../Types/material";
import api from "./api";

// Get all exams
export async function getExams(): Promise<registerExamDTO[]> {
    const response = await api.get("/exams");
    return response.data.response;
}

// Get a exam by IDc
export async function getExamById(id: number): Promise<registerExamDTO> {
    const response = await api.get(`/exam/${id}`);
    return response.data;
}

// Create a new exam
export async function createExam(data: registerExamDTO): Promise<registerExamDTO> {
    const response = await api.post("/exam/create", data);
    return response.data;
}

// Update a exam
export async function updateExam(id: number, data: updateExamDTO): Promise<updateExamDTO> {
    const response = await api.put(`/exam/edit/${id}`, data);
    return response.data;
}

// Attach a file to a material
export async function attachExamFile(data: AttachFileDTO): Promise<registerExamDTO> {
    const response = await api.put("/exam/attach", data);
    return response.data;
}

// Download a material attachment
export async function downloadExamFile(id: number, examFileId: number): Promise<Blob> {
    const response = await api.get<Blob>(`/exam/download/${id}/${examFileId}`, {
        responseType: "blob",
    });

    return response.data;
}

// Delete an exam by ID
export async function deleteExam(id: number) {
    const response = await api.delete(`/exam/delete/${id}`);
    return response.data;
}