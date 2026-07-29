import { UploadedFile } from "./attachment.js"

// used to create an exam
export interface registerExamDTO {
    name: string
    files: UploadedFile[]
    disciplineId: number
    competencesId: number[]
}

// used to create a file and attach to exam
export interface attachtFileDTO {
    examId: number
    files: UploadedFile[]
}

// used to edit an exam
export interface updateExamDTO {
    name: string
    disciplineId: number
    competencesId: number[]
}