import { Class, Discipline, MaterialAttachment } from "#infrastructure/prisma/generated/prisma/client.js";
import { UploadedFile } from "./attachmentDTO.js";

export interface findOneDTO{
    id: number
    name: string
}

export interface viewMaterialsDTO{
    materials: {
        name: string;
    }[];
}

export interface registerMaterialDTO {
    name: string,
    files: UploadedFile[]
    disciplineId: number
    classId: number,
}

export interface showMaterialDTO {
    name: string,
    attachments: MaterialAttachment[]
    discipline: Discipline
    class: Class,
}

export interface updateMaterialDTO {
    name: string,
    files: UploadedFile[]
    disciplineId: number
    classId: number,
}

export interface attachtFileDTO {
    materialId: number
    files: UploadedFile[]
}