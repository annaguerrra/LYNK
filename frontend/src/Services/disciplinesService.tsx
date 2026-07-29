import api from "./api";
import type { DisciplinesDTO, DisciplineDTO, CreateDisciplineDTO } from "../Types/discipline";


export async function getDisciplines(): Promise<DisciplinesDTO[]> {
    const response = await api.get("/disciplines");

    return response.data.response;
}


export async function getDisciplineById(id: number): Promise<DisciplineDTO> {
    const response = await api.get(`discipline/${id}`);

    return response.data.response;
}


export async function createDiscipline(
    data: CreateDisciplineDTO
): Promise<DisciplineDTO> {

    const response = await api.post("discipline/create", data);

    return response.data;
}


export async function updateDiscipline(
    id: number,
    data: CreateDisciplineDTO
): Promise<DisciplineDTO> {

    const response = await api.put(`discipline/${id}`, data);

    return response.data;
}


export async function deleteDiscipline(id: number): Promise<void> {
    await api.delete(`discipline/${id}`);
}