import { DownloadedFile } from "#application/dtos/attachmentDTO.js";
import { attachtFileDTO, registerExamDTO, updateExamDTO } from "#application/dtos/examDTO.js";
import { Exam } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IExamService {
    registerExam(data: registerExamDTO, userId: number): Promise<Exam>
    attachtFile(data: attachtFileDTO, userId: number): Promise<Exam>
    showExams(): Promise<Exam[]>
    getExamById(id: number): Promise<Exam>
    updateExam(id: number, data: updateExamDTO, userId: number): Promise<Exam>
    removeExam(id: number, userId: number): Promise<Exam>
    deleteMany(examsId: number[]): Promise<boolean>
    downloadExam(examId: number, examAttachmentId: number): Promise<DownloadedFile>
}