import { Class, Discipline, MaterialAttachment } from "#infrastructure/prisma/generated/prisma/client.js";
import { UploadedFile } from "./attachmentDTO.js";

// response to findOne service
export interface findOneDTO{
    id: number
    name: string
}

// response to viewMaterials service
export interface viewMaterialsDTO{
    materials: {
        name: string;
    }[];
}

// used to create a material
export interface registerMaterialDTO {
    name: string,
    files: UploadedFile[]
    disciplineId: number
    classId: number,
}

// response to showMaterial service 
export interface showMaterialDTO {
    name: string,
    attachments: MaterialAttachment[]
    discipline: Discipline
    class: Class,
}

// used to update material
export interface updateMaterialDTO {
    name: string,
    files: UploadedFile[]
    disciplineId: number
    classId: number,
}

// used to create files and attach to material
export interface attachtFileDTO {
    materialId: number
    files: UploadedFile[]
}