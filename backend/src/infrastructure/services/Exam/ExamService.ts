import { DownloadedFile } from "#application/dtos/attachmentDTO.js";
import { registerExamDTO, attachtFileDTO, updateExamDTO } from "#application/dtos/examDTO.js";
import { IExamService } from "#application/services/Exam/IExam.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Exam } from "#infrastructure/prisma/generated/prisma/client.js";
import { AttachmentService } from "../Attachment/AttachmentService.js";

export class ExamService implements IExamService {
    constructor(private attachmentService: AttachmentService) {}
    
    async registerExam(data: registerExamDTO, userId: number): Promise<Exam> {
        const { name, files, disciplineId, competencesId } = data
        const uploadedIds: string[] = []

        try {
            const attachmentIds = await Promise.all(
                files.map(async file => {
                    const id = await this.attachmentService.upload(file)
                    uploadedIds.push(id)
                    return id
                })
            )
            
            const createdExam = await prisma.exam.create({
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

            await prisma.log.create({
                data: {
                    action: "CREATED",
                    entityType: "Exam",
                    entityId: createdExam.id,
                    oldData: {},
                    newData: {
                        ...createdExam
                    },
                    instructorId: userId
                }
            })

            return createdExam

        } catch (e) {
            await Promise.allSettled(
                uploadedIds.map(id => this.attachmentService.delete(id))
            )

            throw e
        }
    }

    async attachtFile(data: attachtFileDTO, userId: number): Promise<Exam> {
        const { examId, files } = data
        const uploadedIds: string[] = []

        try {
            const attachmentIds = await Promise.all(
                files.map(async file => {
                    const id = await this.attachmentService.upload(file)
                    uploadedIds.push(id)
                    return id
                })
            )

            const target = await prisma.exam.findUnique({
                where: {
                    id: examId
                }
            })

            if (!target)
                throw new Error("Exam not found")

            const updatedExam = await prisma.exam.update({
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

            await prisma.log.create({
                data: {
                    action: "UPDATED",
                    entityType: "Exam",
                    entityId: target.id,
                    oldData: {
                        ...target
                    },
                    newData: {
                        ...updatedExam
                    },
                    instructorId: userId
                }
            })

        } catch (e) {
            await Promise.allSettled(
                uploadedIds.map(id => this.attachmentService.delete(id))
            )

            throw e
        }

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

    async updateExam(id: number, data: updateExamDTO, userId: number): Promise<Exam> {
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

    async removeExam(id: number, userId: number): Promise<Exam> {
        const exam = await prisma.exam.findUnique({
            where: {
                id: id
            },
            include: {
                attachments: true
            }
        })

        if(!exam){
            throw new Error("Exam not found")
        }

        await Promise.all(
            exam.attachments.map(a => this.attachmentService.delete(a.attachmentId))
        )

        return prisma.exam.delete({
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

//faltou logs: update, remove e download