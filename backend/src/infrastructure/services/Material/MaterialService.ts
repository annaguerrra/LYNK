import { DownloadedFile } from "#application/dtos/attachmentDTO.js";
import { registerMaterialDTO, showMaterialDTO, updateMaterialDTO, attachtFileDTO } from "#application/dtos/materialDTO.js";
import { IMaterialService } from "#application/services/Material/IMaterial.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Material } from "#infrastructure/prisma/generated/prisma/client.js";
import { AttachmentService } from "../Attachment/AttachmentService.js";
import { UserService } from "../User/UserService.js";

export class MaterialService implements IMaterialService {
    constructor(
        private userService: UserService,
        private attachmentService: AttachmentService
    ) {}

    async registerMaterial(data: registerMaterialDTO, userId: number): Promise<Material> {
        const isAdmin = await this.userService.isAdmin(userId)
        const { name, files, disciplineId, classId } = data
        const uploadedIds: string[] = []

        try {
            const attachmentIds = await Promise.all(
                files.map(async file => {
                    const id = await this.attachmentService.upload(file)
                    uploadedIds.push(id)
                    return id
                })
            )

            const createdMaterial = await prisma.material.create({
                data: {
                    name: name,
                    attachments: {
                        create: attachmentIds.map(id => ({
                            attachmentId: id
                        }))
                    },
                    discipline: {
                        connect: {
                            id: disciplineId
                        }
                    },
                    class: {
                        connect: {
                            id: classId
                        }
                    }
                }
            })

            await prisma.log.create({
                data: {
                    action: "CREATED",
                    entityType: "Material",
                    entityId: createdMaterial.id,
                    oldData: {},
                    newData: {
                        ...createdMaterial
                    },
                    ...(isAdmin && { adminId: userId }),
                    ...(!isAdmin && { instructorId: userId })
                }
            })

            return createdMaterial

        } catch (e) {
            await Promise.allSettled(
                uploadedIds.map(id => this.attachmentService.delete(id))
            )

            throw e
        }

    }

    async getMaterialById(id: number): Promise<showMaterialDTO | null> {
        return await prisma.material.findUnique({
            where: {
                id: id
            },
            select: {
                name: true,
                attachments: true,
                discipline: true,
                class: true
            }
        })
    }

    async updateMaterial(id: number, data: updateMaterialDTO, userId: number): Promise<Material> {
        const isAdmin = await this.userService.isAdmin(userId)
        const { name, files, disciplineId, classId } = data
        const uploadedIds: string[] = []

        try {
            const target = await prisma.material.findUnique({
                where: {
                    id: id
                }
            })

            if (!target)
                throw new Error("Material not found")

            const attachmentIds = await Promise.all(
                files.map(async file => {
                    const id = await this.attachmentService.upload(file)
                    uploadedIds.push(id)
                    return id
                })
            )

            const updatedMaterial = await prisma.material.update({
                where: {
                    id: id
                },
                data: {
                    name: name,
                    attachments: {
                        create: attachmentIds.map(id => ({
                            attachmentId: id
                        }))
                    },
                    discipline: {
                        connect: {
                            id: disciplineId
                        }
                    },
                    class: {
                        connect: {
                            id: classId
                        }
                    }
                }
            })

            await prisma.log.create({
                data: {
                    action: "DELETED",
                    entityType: "Material",
                    entityId: target.id,
                    oldData: {
                        ...target
                    },
                    newData: {
                        ...updatedMaterial
                    },
                    ...(isAdmin && { adminId: userId }),
                    ...(!isAdmin && { instructorId: userId })  
                }
            })

            return updatedMaterial

        } catch (e) {
            await Promise.allSettled(
                uploadedIds.map(id => this.attachmentService.delete(id))
            )

            throw e
        }
    }

    async deleteMaterial(id: number, userId: number): Promise<boolean> {
        const isAdmin = await this.userService.isAdmin(userId)

        const target = await prisma.material.findUnique({
            where: {
                id: id
            },
            include: {
                attachments: true
            }
        })

        if (!target)
            throw new Error("Material not found")

        await Promise.all(
            target.attachments.map(a => this.attachmentService.delete(a.attachmentId))
        )

        await prisma.material.delete({
            where: {
                id: id
            }
        })

        await prisma.log.create({
            data: {
                action: "DELETED",
                entityType: "Material",
                entityId: target.id,
                oldData: {
                    ...target
                },
                newData: {},
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        })

        return true
    }

    async attachtFile(data: attachtFileDTO, userId: number): Promise<Material> {
        const isAdmin = await this.userService.isAdmin(userId)
        const { materialId, files } = data
        const uploadedIds: string[] = []

        try {
            const attachmentIds = await Promise.all(
                files.map(async file => {
                    const id = await this.attachmentService.upload(file)
                    uploadedIds.push(id)
                    return id
                })
            )

            const target = await prisma.material.findUnique({
                where: {
                    id: materialId
                }
            })

            if (!target)
                throw new Error("Material not found")

            const updatedMaterial = await prisma.material.update({
                where: {
                    id: materialId
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
                    entityType: "Material",
                    entityId: target.id,
                    oldData: {
                        ...target
                    },
                    newData: {
                        ...updatedMaterial
                    },
                    ...(isAdmin && { adminId: userId }),
                    ...(!isAdmin && { instructorId: userId })
                }
            })

            return updatedMaterial

        } catch (e) {
            await Promise.allSettled(
                uploadedIds.map(id => this.attachmentService.delete(id))
            )

            throw e
        }
    }

    async downloadMaterial(materialId: number, materialAttachmentId: number): Promise<DownloadedFile> {
        const materialAttachment = await prisma.materialAttachment.findUnique({
            where: {
                id: materialAttachmentId
            }
        })

        if(!materialAttachment || materialAttachment.materialId !== materialId){
            throw new Error("File not found")
        }

        return this.attachmentService.download(materialAttachment.attachmentId)
    }

}