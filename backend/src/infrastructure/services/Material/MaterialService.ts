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
        // consults if user creating the exam is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)
        // variables used to create material
        const { name, files, disciplineId, classId } = data
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
                    entityType: "MATERIAL",
                    entityId: createdMaterial.id,
                    entityName: createdMaterial.name,
                    oldData: {},
                    newData: {
                        ...createdMaterial
                    },
                    // uses isAdmin variable to determin if log register an admin ou an instructor
                    ...(isAdmin && { adminId: userId }),
                    ...(!isAdmin && { instructorId: userId }),
                    username: username
                }
            })

            return createdMaterial

        } catch (e) {
            // if fails to create exam deletes all files at uploadedFiles list
            // used to ensure that files won't be orfan
            await Promise.allSettled(
                uploadedIds.map(id => this.attachmentService.delete(id))
            )

            throw e
        }

    }

    // selects material by id
    async getMaterialById(id: number): Promise<showMaterialDTO> {
        const material = await prisma.material.findUnique({
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

        if(!material)
            throw new Error("Material not found!")

        return material
    }

    async updateMaterial(id: number, data: updateMaterialDTO, userId: number): Promise<Material> {
        // consults if user updating the material is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)
        // variables used to update material
        const { name, files, disciplineId, classId } = data
        // variable used to store created attachments
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
                // creates files and add them to the uploadedFiles list
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
                    entityType: "MATERIAL",
                    entityId: target.id,
                    entityName: target.name,
                    oldData: {
                        ...target
                    },
                    newData: {
                        ...updatedMaterial
                    },
                    // uses isAdmin variable to determin if log registers an admin ou an instructor
                    ...(isAdmin && { adminId: userId }),
                    ...(!isAdmin && { instructorId: userId }),
                    username: username
                }
            })

            return updatedMaterial

        } catch (e) {
            // if fails to create material deletes all files at uploadedFiles list
            // used to ensure that files won't be orfan
            await Promise.allSettled(
                uploadedIds.map(id => this.attachmentService.delete(id))
            )

            throw e
        }
    }

    async deleteMaterial(id: number, userId: number): Promise<boolean> {
        // consults if user deleting the material is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)

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

        // deletes all attachments in the material
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
                entityType: "MATERIAL",
                entityId: target.id,
                entityName: target.name,
                oldData: {
                    ...target
                },
                newData: {},
                // uses isAdmin variable to determin if log registers an admin ou an instructor
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: username
            }
        })

        return true
    }

    async deleteMany(materialId: number[]): Promise<boolean> {
        try {
            await prisma.area.deleteMany({
                where: {
                    id: {
                        in: materialId
                    }
                }
            })

        } catch (e) {
            throw e
        }
        return true
    }

    async attachtFile(data: attachtFileDTO, userId: number): Promise<Material> {
        // consults if user updating the material is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)
        // variables used to attacht file
        const { materialId, files } = data
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

            const target = await prisma.material.findUnique({
                where: {
                    id: materialId
                }
            })

            if (!target)
                throw new Error("Material not found")

            // connects created files to material
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
                    entityType: "MATERIAL",
                    entityId: target.id,
                    entityName: target.name,
                    oldData: {
                        ...target
                    },
                    newData: {
                        ...updatedMaterial
                    },
                    // uses isAdmin variable to determin if log registers an admin ou an instructor
                    ...(isAdmin && { adminId: userId }),
                    ...(!isAdmin && { instructorId: userId }),
                    username: username
                }
            })

            return updatedMaterial

        } catch (e) {
            // if fails to create exam deletes all files at uploadedFiles list
            // used to ensure that files won't be orfan
            await Promise.allSettled(
                uploadedIds.map(id => this.attachmentService.delete(id))
            )

            throw e
        }
    }

    async downloadMaterial(materialId: number, materialAttachmentId: number): Promise<DownloadedFile> {
        // finds attachments related to material
        const materialAttachment = await prisma.materialAttachment.findUnique({
            where: {
                id: materialAttachmentId
            }
        })

        // verifies there are attachments in the material
        if(!materialAttachment || materialAttachment.materialId !== materialId){
            throw new Error("File not found")
        }

        // calls download service
        return this.attachmentService.download(materialAttachment.attachmentId)
    }

}