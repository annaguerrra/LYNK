import api from "./api";
import type { ShowMaterialDTO, RegisterMaterialDTO, UpdateMaterialDTO, AttachFileDTO } from "../Types/material";

// Get a material by ID
export async function getMaterialById(id: number): Promise<ShowMaterialDTO> {
    const response = await api.get(`/material/${id}`);
    return response.data;
}

// Create a new material
export async function createMaterial(data: RegisterMaterialDTO): Promise<ShowMaterialDTO> {
    const response = await api.post("/material/create", data);
    return response.data;
}

// Update a material
export async function updateMaterial(id: number, data: UpdateMaterialDTO): Promise<ShowMaterialDTO> {
    const response = await api.put(`/material/edit/${id}`, data);
    return response.data;
}

// Attach a file to a material
export async function attachMaterialFile(data: AttachFileDTO): Promise<ShowMaterialDTO> {
    const response = await api.put("/material/attach", data);
    return response.data;
}

// Download a material attachment
export async function downloadMaterial(id: number): Promise<Blob> {
    const response = await api.get<Blob>(`/material/${id}/download`, {
        responseType: "blob",
    });

    return response.data;
}

// Delete a material
export async function deleteMaterial(id: number): Promise<void> {
    await api.delete(`/material/delete/${id}`);
}