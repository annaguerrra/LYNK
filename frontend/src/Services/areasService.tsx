import api from "./api";
import type { AreaDTO, registerAreaDTO, updateAreaDTO } from "../Types/area";

export async function getAreas(): Promise<AreaDTO[]> {
    const response = await api.get("/areas");
    return response.data.response;
}

export async function createArea(data: registerAreaDTO[]) : Promise<registerAreaDTO> {
    const response = await api.post("area/create", data);
    return response.data.response;    
}

export async function updateArea(
    id: number,
    data: updateAreaDTO
): Promise<updateAreaDTO> {

    const response = await api.put(`area/edit/${id}`, data);

    return response.data;
}


export async function deleteArea(id: number): Promise<void> {
    await api.delete(`area/delete/${id}`);
}