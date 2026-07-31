import api from "./api";
import type { CompetenceDTO, UpdateCompetenceDTO } from "../Types/competence";

// Get all competences
export async function getCompetence(): Promise<CompetenceDTO[]> {
    const response = await api.get("/competencies");

    return response.data.response;
}

// Creating a competency
export async function createCompetenceService(name: string) {
    const response = await api.post("/competency/create", { name: name});
    return response.data.response;
}

// Updating a competency
export async function updateCompetence(id: number, data: UpdateCompetenceDTO): Promise<CompetenceDTO> {
    const response = await api.put(`/competency/edit/${id}`, data);
    return response.data.response;
}

// Deleting a competence
export async function deleteCompetence(id: number): Promise<void> {
    await api.delete(`/competency/delete/${id}`);
}
