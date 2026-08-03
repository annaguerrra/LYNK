import api from "./api";
import type { ShowMaterialDTO, UpdateMaterialDTO, AttachFileDTO } from "../Types/material";

// Get a material by ID
export async function getMaterialById(id: number): Promise<ShowMaterialDTO> {
    const response = await api.get(`/material/${id}`);
    return response.data;
}

// Create a new material
export async function createMaterial(data: FormData) {
    const response = await api.post("/material/create", data);
    return response.data;
}

// Update a material
export async function updateMaterial(id: number, data: UpdateMaterialDTO): Promise<ShowMaterialDTO> {
    const response = await api.put(`/material/edit/${id}`, data);
    return response.data;
}

// Attach a file to a material
export async function attachMaterialFile(id: number, data: AttachFileDTO): Promise<ShowMaterialDTO> {
    console.log(id, data)
    const response = await api.put(`/material/${id}/attach`, data);
    return response.data.response;
}

// Download a material attachment
export async function downloadMaterial( materialId: number, materialAttachmentId: number): Promise<Blob> {
    const response = await api.get<Blob>( `/material/${materialId}/attachment/${materialAttachmentId}/download`, { responseType: "blob",});
    return response.data;
}

// Delete a material
export async function deleteMaterial(id: number): Promise<void> {
    await api.delete(`/material/delete/${id}`);
}