import { DownloadedFile } from "#application/dtos/attachmentDTO.js";
import { registerExamDTO, attachtFileDTO, updateExamDTO } from "#application/dtos/examDTO.js";
import { IExamService } from "#application/services/Exam/IExam.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Exam } from "#infrastructure/prisma/generated/prisma/client.js";
import { AttachmentService } from "../Attachment/AttachmentService.js";
import { UserService } from "../User/UserService.js";

export class ExamService implements IExamService {
    constructor(
        private attachmentService: AttachmentService,
        private userService: UserService
    ) {}
    
    async registerExam(data: registerExamDTO, userId: number): Promise<Exam> {
        // variables used to create exam
        const { name, files, disciplineId, competencesId } = data
        // consults if user creating the exam is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)
        // variable used to store created attachments
        const uploadedIds: string[] = []

        try {
            // creates files and add them to the uploadedFiles list
            const attachmentIds = await Promise.all(
                files.map(async file => {
                    const id = await this.attachmentService.upload(file)
                    uploadedIds.push(id)
                    return id
                })
            )
            
            // variable used to create exam
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
                    entityName: createdExam.name,
                    oldData: {},
                    newData: {
                        ...createdExam
                    },
                    // uses isAdmin variable to determin if log registers an admin ou an instructor
                    ...(isAdmin && { adminId: userId }),
                    ...(!isAdmin && { instructorId: userId }),
                    username: username
                }
            })

            return createdExam

        } catch (e) {
            // if fails to create exam deletes all files at uploadedFiles list
            // used to ensure that files won't be orfan
            await Promise.allSettled(
                uploadedIds.map(id => this.attachmentService.delete(id))
            )

            throw e
        }
    }

    async attachtFile(data: attachtFileDTO, userId: number): Promise<Exam> {
        // consults if user updating the exam is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)
        // variables used to attach files to an exam
        const { id, files } = data
        // variable used to store created attachments
        const uploadedIds: string[] = []

        try {
            // creates files and add them to the uploadedFiles list
            const attachmentIds = await Promise.all(
                files.map(async file => {
                    const id = await this.attachmentService.upload(file)
                    uploadedIds.push(id)
                    return id
                })
            )

            // variable used to search if the exam is valid
            const target = await prisma.exam.findUnique({
                where: {
                    id: Number(id)
                }
            })

            if (!target)
                throw new Error("Exam not found")

            // connect files to exam
            const updatedExam = await prisma.exam.update({
                where: {
                    id: target.id
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
                    entityName: target.name,
                    oldData: {
                        ...target
                    },
                    newData: {
                        ...updatedExam
                    },
                    // uses isAdmin variable to determin if log register an admin ou an instructor
                    ...(isAdmin && { adminId: userId }),
                    ...(!isAdmin && { instructorId: userId }),
                    username: username
                }
            })

            return updatedExam

        } catch (e) {
            // if fails to create exam deletes all files at uploadedFiles list
            // used to ensure that files won't be orfan
            await Promise.allSettled(
                uploadedIds.map(id => this.attachmentService.delete(id))
            )

            throw e
        }

    }

    async showExams(): Promise<Exam[]> {
        return await prisma.exam.findMany({
            include: {
                competences: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                attachments: true
            }
        })
    }

    async getExamById(id: number): Promise<Exam> {
        const target = await prisma.exam.findUnique({
            where: {
                id: id
            },
            include: {
                competences: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                attachments: true
            }
        })

        if(!target)
            throw new Error("Exam not found!")

        return target
    }

    async updateExam(id: number, data: updateExamDTO, userId: number): Promise<Exam> {
        // variables used to update exam
        const { name, disciplineId, competencesId } = data
        // consults if user updating the exam is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)

        // variable used to search if the exam is valid
        const target = await prisma.exam.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!target)
            throw new Error("Exam not found")

        const updatedExam = await prisma.exam.update({
            where: {
                id: target.id
            },
            data: {
                name: name,
                disciplineId: Number(disciplineId),
                competences: {
                    connect: competencesId.map(id => ({ id }))
                }
            }
        })

        await prisma.log.create({
            data: {
                entityId: target.id,
                entityType: "Exam",
                entityName: target.name,
                action: "UPDATED",
                oldData: {
                    ...target
                },
                newData: {
                    ...updatedExam
                },
                // uses isAdmin variable to determin if log registers an admin ou an instructor
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: username
            }
        })

        return updatedExam
    }

    async removeExam(id: number, userId: number): Promise<Exam> {
        // consults if user deleting the exam is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)
        const target = await prisma.exam.findUnique({
            where: {
                id: id
            },
            include: {
                attachments: true
            }
        })

        if(!target){
            throw new Error("Exam not found")
        }

        // deletes all files attach to this exam
        await Promise.all(
            target.attachments.map(a => this.attachmentService.delete(a.attachmentId))
        )

        const removedExam = await prisma.exam.delete({
            where: {
                id: id
            }
        })

        await prisma.log.create({
            data: {
                action: "DELETED",
                entityType: "Exam",
                entityId: target.id,
                entityName: target.name,
                oldData: {
                    ...target
                },
                newData: {},
                // uses isAdmin variable to determin if log register an admin ou an instructor
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: username
            }
        })

        return removedExam
    }

    async deleteMany(examId: number[]): Promise<boolean> {
        try {
            await prisma.area.deleteMany({
                where: {
                    id: {
                        in: examId
                    }
                }
            })

        } catch (e) {
            throw e
        }
        return true
    }

    async downloadExam(examId: number, examAttachmentId: number): Promise<DownloadedFile> {
        // search attchment to download
        const examAttachment = await prisma.examAttachment.findUnique({
            where: {
                id: examAttachmentId
            }
        })

        // used to search if the exam and the attachment are valid
        if(!examAttachment || examAttachment.examId !== examId){
            throw new Error("File not found")
        }

        // calls download service
        return this.attachmentService.download(examAttachment.attachmentId)
    }

}