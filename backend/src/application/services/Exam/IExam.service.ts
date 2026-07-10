import { attachtFileDTO, registerExamDTO, showExamDTO } from "#application/dtos/examDTO.js";
import { Exam } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IExamService {
    registerExam(data: registerExamDTO): Promise<Exam>
    attachtFile(data: attachtFileDTO): Promise<Exam>
    showExams(): Promise<Exam[]>
    showExam(id: number): Promise<showExamDTO>
    // dowloadExam():
}