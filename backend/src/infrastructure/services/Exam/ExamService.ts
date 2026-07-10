import { registerExamDTO, attachtFileDTO, showExamDTO } from "#application/dtos/examDTO.js";
import { IExamService } from "#application/services/Exam/IExam.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Exam } from "#infrastructure/prisma/generated/prisma/client.js";
import { AttachmentService } from "../Attachment/AttachmentService.js";

export class ExamService implements IExamService {
    constructor(private attachmentService: AttachmentService) {}
    
    async registerExam(data: registerExamDTO): Promise<Exam> {
        const { name, files, disciplineId, competencesId } = data
        const attachmentIds = await Promise.all(
            files.map(file => this.attachmentService.upload(file))
        );
        
        const examId = await prisma.exam.create({
            data: {
                name: name,
                disciplineId: disciplineId,
                competences: {
                    connect: competencesId.map(id => ({ id }))
                }
            },
            select: {
                id: true
            }
        })

        const attachments = await prisma.examAttachment.createMany({
            data: attachmentIds.map(id => ({
                examId: examId,
                attachmentId: id
            }))
        })

        await prisma.exam.update({
            where: {
                id: examId
            },
            data: {
                attachments: attachments
            }
        })

        return prisma.exam.findFirst({where: {id: examId}})

    }

    async attachtFile(data: attachtFileDTO): Promise<Exam> {
        const { examId, files } = data
        const attachmentIds = await Promise.all(
            files.map(file => this.attachmentService.upload(file))
        );

        const attachments = await prisma.examAttachment.createMany({
            data: attachmentIds.map(id => ({
                examId: examId,
                attachmentId: id
            }))
        })

        return await prisma.exam.update({
            where: {
                id: examId
            },
            data: {
                attachments: attachments
            }
        })

    }

    async showExams(): Promise<Exam[]> {
        return await prisma.exam.findMany()
    }

    async getExamById(id: number): Promise<Exam> {
        return await prisma.exam.findFirst({
            where: {
                id: id
            }
        })
    }

}  