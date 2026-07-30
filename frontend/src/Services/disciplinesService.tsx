import api from "./api";
import type { DisciplinesDTO, DisciplineDTO, CreateDisciplineDTO, assignCompetencyDTO } from "../Types/discipline";
import type { ShowMaterialDTO } from "../Types/material";
import type { registerCompetenceDTO } from "../Types/competence";

// Get all disciplines
export async function getDisciplines(): Promise<DisciplinesDTO[]> {
    const response = await api.get("/disciplines");
    return response.data.response;
}

// Get a discipline by Id
export async function getDisciplineById(id: number): Promise<DisciplineDTO> {
    const response = await api.get(`/discipline/${id}`)
    return response.data.response;
}

// Creating a discipline
export async function createDiscipline(data: CreateDisciplineDTO): Promise<DisciplineDTO> {
    const response = await api.post("/discipline/create", data);
    return response.data.response;
}

// Updating a discipline
export async function updateDiscipline(id: number, data: CreateDisciplineDTO): Promise<DisciplineDTO> {
    const response = await api.put(`/discipline/editar/${id}`, data);
    return response.data.response;
}

// Deleting a discipline
export async function deleteDiscipline(id: number): Promise<void> {
    await api.delete(`discipline/delete/${id}`);
}

// Duplicating a discipline
export async function duplicateDiscipline(id: number): Promise<DisciplineDTO> {
    const response = await api.post(`/discipline/${id}/duplicate`);
    return response.data.response;
}

// Get all discipline materials
export async function getDisciplineMaterials(id: number): Promise<ShowMaterialDTO> {
    const response = await api.get(`/discipline/${id}/materials`)
    return response.data.response;
}

// Get all discipline competences
export async function getDisciplineCompetences(id: number): Promise<registerCompetenceDTO> {
    const response = await api.get(`/discipline/${id}/competences`)
    return response.data.response;
}

// Assing competency to discipline
export async function assignCompetency(data: assignCompetencyDTO): Promise<assignCompetencyDTO> {
    const response = await api.post(`/discipline/assingcompetence`, data)
    return response.data.response;
}

