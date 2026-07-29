import type { registerExamDTO, updateExamDTO, attachtFileDTO } from "../Types/exam";
import api from "./api";


// Get all exams
export async function getExams() {
    const response = await api.get("/exams");
    return response.data;
}

// Get an exam by ID
export async function getExamById(id: number) {
    const response = await api.get(`/exam/${id}`);
    return response.data;
}

// Create a new exam
export async function createExam(data: registerExamDTO) {
    const response = await api.post("/exam/create", data);
    return response.data;
}

// Update an existing exam
export async function updateExam(id: number, data: updateExamDTO) {
    const response = await api.put(`/exam/edit/${id}`, data);
    return response.data;
}

// Attach files to an exam
export async function attachExamFile(data: attachtFileDTO) {
    const response = await api.put("/exam/attachfile", data);
    return response.data;
}

// Download an exam attachment
export async function downloadExamFile(
    examId: number,
    examAttachmentId: number
): Promise<Blob> {
    const response = await api.get(
        `/exam/download/${examId}/${examAttachmentId}`,
        {
            responseType: "blob",
        }
    );

    return response.data;
}

// Delete an exam by ID
export async function deleteExam(id: number) {
    const response = await api.delete(`/exam/delete/${id}`);
    return response.data;
}