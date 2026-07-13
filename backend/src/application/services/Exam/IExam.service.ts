import { DownloadedFile } from "#application/dtos/attachmentDTO.js";
import { attachtFileDTO, registerExamDTO, updateExamDTO } from "#application/dtos/examDTO.js";
import { Exam } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IExamService {
    registerExam(data: registerExamDTO): Promise<Exam>
    attachtFile(data: attachtFileDTO): Promise<Exam>
    showExams(): Promise<Exam[]>
    getExamById(id: number): Promise<Exam>
    updateExam(id: number, data: updateExamDTO): Promise<Exam>
    removeExam(id: number): Promise<Exam>
    downloadExam(examId: number, examAttachmentId: number): Promise<DownloadedFile>
}