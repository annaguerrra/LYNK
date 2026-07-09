import { UploadedFile } from "./attachmentDTO.js"

export interface registerExamDTO {
    name: string
    file: UploadedFile
    disciplineId: number
}

export interface attachtFileDTO {
    name: string
    file: UploadedFile
}

export interface showExamDTO {
    name: string
    files: UploadedFile[]
    discipline: string
}