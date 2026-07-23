import { Competence, ExamAttachment } from "#infrastructure/prisma/generated/prisma/client.js"
import { UploadedFile } from "./attachmentDTO.js"

export interface registerExamDTO {
    name: string
    files: UploadedFile[]
    disciplineId: number
    competencesId: number[]
}

export interface attachtFileDTO {
    examId: number
    files: UploadedFile[]
}

export interface updateExamDTO {
    name: string
    disciplineId: number
    competencesId: number[]
}