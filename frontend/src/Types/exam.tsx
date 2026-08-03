import type { UploadedFileDTO } from "./attachment"
// import type { CompetenceDTO } from "./competence"

// used to view an exam
export interface viewExamDTO {
    name: string
    competencesId: number[]
}

// used to create an exam
export interface RegisterExamDTO {
    name: string;
    attachments: File[];
    disciplineId: number;
    competencesId: number[];
}

// used to create a file and attach to exam
export interface attachtFileDTO {
    examId: number
    files: UploadedFileDTO[]
}

// used to edit an exam
export interface updateExamDTO {
    name: string
    files: File[];
    disciplineId: number
    competencesId: number[]
}

export interface ExamAttachmentDTO {
    id: number;
    attachmentId: string;
    examId: number;
}

export interface ExamDTO {
    id: number;
    name: string;
    attachments: ExamAttachmentDTO[];
    competences?: {
        id: number;
        name: string;
    }[];
}