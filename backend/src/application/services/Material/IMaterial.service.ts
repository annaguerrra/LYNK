import { DownloadedFile } from "#application/dtos/attachmentDTO.js";
import { attachtFileDTO, registerMaterialDTO, showMaterialDTO, updateMaterialDTO } from "#application/dtos/materialDTO.js";
import { Material } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IMaterialService {
    registerMaterial(data: registerMaterialDTO, userId: number): Promise<Material>
    getMaterialById(id: number): Promise<showMaterialDTO | null>
    updateMaterial(id: number, data: updateMaterialDTO, userId: number): Promise<Material>
    deleteMaterial(id: number, userId: number): Promise<boolean>
    attachtFile(data: attachtFileDTO, userId: number): Promise<Material>
    downloadMaterial(materialId: number, materialAttachmentId: number): Promise<DownloadedFile>
}