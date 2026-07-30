import api from "./api";
import type { registerCompetenceDTO, updateCompetenceDTO } from "../Types/competence";

// Get all competences
export async function getCompetence(): Promise<registerCompetenceDTO[]> {
    const response = await api.get("/competencies");

    return response.data.response;
}

// Creatikng a competency
export async function createCompetence(): Promise<registerCompetenceDTO[]> {
    const response = await api.get("/competency/create");

    return response.data.response;
}

// Updating a competency
export async function updateCompetence(id: number, data: updateCompetenceDTO): Promise<updateCompetenceDTO> {
    const response = await api.put(`/competency/edit/${id}`, data);
    return response.data.response;
}

// Deleting a competence
export async function deleteCompetence(id: number): Promise<void> {
    await api.delete(`/competency/delete/${id}`);
}
