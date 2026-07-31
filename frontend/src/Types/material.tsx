import type { MaterialAttachmentDTO, UploadedFileDTO } from "./attachment";
import type { ClassDTO } from "./class";
import type { DisciplineDTO } from "./discipline";

// Response to find one material service
export interface MaterialDTO {
    id: number;
    name: string;
}

// Response to view materials service
export interface ViewMaterialsDTO {
    materials: {
        name: string;
    }[];
}

// Used to create a material
export interface RegisterMaterialDTO {
    name: string;
    files: UploadedFileDTO[];
    disciplineId: number;
    classId: number;
}

// Response to show material service
export interface ShowMaterialDTO {
    name: string;
    attachments: MaterialAttachmentDTO[];
    discipline: DisciplineDTO;
    class: ClassDTO;
}

// Used to update material
export interface UpdateMaterialDTO {
    name: string;
    files: UploadedFileDTO[];
    disciplineId: number;
    classId: number;
}

// Used to create files and attach to material
export interface AttachFileDTO {
    materialId: number;
    files: UploadedFileDTO[];
}