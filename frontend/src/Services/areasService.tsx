import api from "./api";
import type { registerAreaDTO, updateAreaDTO } from "../Types/area";

export async function getAreas(): Promise<registerAreaDTO[]> {
    const response = await api.get("/areas");
    return response.data.response;
}