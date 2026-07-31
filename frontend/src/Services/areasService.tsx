import api from "./api";
import type { AreaDTO, registerAreaDTO, updateAreaDTO } from "../Types/area";

// Get all areas
export async function getAreas(): Promise<AreaDTO[]> {
    const response = await api.get("/areas");
    return response.data.response;
}

// Create a new area
export async function createArea(data: registerAreaDTO) : Promise<AreaDTO> {
    const response = await api.post("/area/create", data);
    return response.data.response;    
}

// Updating a area by Id
export async function updateArea(id: number, data: updateAreaDTO): Promise<AreaDTO> {
    const response = await api.put(`/area/edit/${id}`, data);
    return response.data;
}

//Deleting a area
export async function deleteArea(id: number): Promise<void> {
    await api.delete(`/area/delete/${id}`);
}