import { DownloadedFile } from "#application/dtos/attachmentDTO.js";
import { registerExamDTO, attachtFileDTO, showExamDTO, updateExamDTO } from "#application/dtos/examDTO.js";
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
        
        return await prisma.exam.create({
            data: {
                name: name,
                disciplineId: disciplineId,
                competences: {
                    connect: competencesId.map(id => ({ id }))
                },
                attachments: {
                    create: attachmentIds.map(id => ({
                        attachmentId: id
                    }))
                }
            }
        })

        // const attachments = await prisma.examAttachment.createMany({
        //     data: attachmentIds.map(id => ({
        //         examId: examId,
        //         attachmentId: id
        //     }))
        // })

        // return await prisma.exam.update({
        //     where: {
        //         id: examId
        //     },
        //     data: {
        //         attachments: attachments
        //     }
        // })

        // maneira antiga de fazer

    }

    async attachtFile(data: attachtFileDTO): Promise<Exam> {
        const { examId, files } = data
        const attachmentIds = await Promise.all(
            files.map(file => this.attachmentService.upload(file))
        );

        return await prisma.exam.update({
            where: {
                id: examId
            },
            data: {
                attachments: {
                    create: attachmentIds.map(id => ({
                        attachmentId: id
                    }))
                }
            }
        })

    }

    async showExams(): Promise<Exam[]> {
        return await prisma.exam.findMany()
    }

    async getExamById(id: number): Promise<Exam> {
        return await prisma.exam.findFirstOrThrow({
            where: {
                id: id
            }
        })
    }

    async updateExam(id: number, data: updateExamDTO): Promise<Exam> {
        const { name, disciplineId, competencesId } = data

        return await prisma.exam.update({
            where: {
                id: id
            },
            data: {
                name: name,
                disciplineId: disciplineId,
                competences: {
                    connect: competencesId.map(id => ({ id }))
                }
            }
        })
    }

    async removeExam(id: number): Promise<Exam> {
        return await prisma.exam.delete({
            where: {
                id: id
            }
        })
    }

    async downloadExam(examId: number, examAttachmentId: number): Promise<DownloadedFile> {
        const examAttachment = await prisma.examAttachment.findUnique({
            where: {
                id: examAttachmentId
            }
        })

        if(!examAttachment || examAttachment.examId !== examId){
            throw new Error("File not found")
        }

        return this.attachmentService.download(examAttachment.attachmentId)
    }

}  