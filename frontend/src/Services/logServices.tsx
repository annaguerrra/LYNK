import type { HistoricDTO } from "../Types/historic";
import api from "./api";

// Get all deleted areas
export async function getLogAreas(entity: string): Promise<HistoricDTO[]> {
    const response = await api.get(`/logs/${entity}`);
    return response.data;
}

// Get all deleted disciplines
export async function getLogDisciplines(entity: string): Promise<HistoricDTO[]> {
    const response = await api.get(`/logs/${entity}`);
    return response.data;
}

// Get all deleted competency
export async function getLogCompetences(entity: string): Promise<HistoricDTO[]> {
    const response = await api.get(`/logs/${entity}`);
    return response.data;
}

// Get all deleted disciplines
export async function getLogExams(entity: string): Promise<HistoricDTO[]> {
    const response = await api.get(`/logs/${entity}`);
    return response.data;
}

// Get all deleted disciplines
export async function getLogClasses(entity: string): Promise<HistoricDTO[]> {
    const response = await api.get(`/logs/${entity}`);
    return response.data;
}

// Get all deleted users
export async function getLogUsers(entity: string): Promise<HistoricDTO[]> {
    const response = await api.get(`/logs/${entity}`);
    return response.data;
}