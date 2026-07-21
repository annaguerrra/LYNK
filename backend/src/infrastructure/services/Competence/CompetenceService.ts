import { registerCompetenceDTO, updateCompetenceDTO } from "#application/dtos/competenceDTO.js";
import { ICompetenceService } from "#application/services/Competence/ICompetence.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Competence } from "#infrastructure/prisma/generated/prisma/client.js";
import { UserService } from "../User/UserService.js";

export class CompetenceService implements ICompetenceService {
    constructor(private userService: UserService) {}

    async registerCompetence(data: registerCompetenceDTO, userId: number): Promise<Competence> {
        const { name } = data
        const isAdmin = await this.userService.isAdmin(userId)
        const createdCompetence = await prisma.competence.create({
            data: { name }
        })

        await prisma.log.create({
            data: {
                action: "CREATED",
                entityType: "Compentence",
                entityId: createdCompetence.id,
                entityName: createdCompetence.name,
                oldData: {},
                updatedAt: new Date(),
                newData: {
                    ...createdCompetence
                },
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        })

        return createdCompetence
    }
    
    async showCompetences(): Promise<Competence[]> {
        return await prisma.competence.findMany()
    }

    async getCompetenceByName(name: string): Promise<Competence | null> {
        return await prisma.competence.findFirst({
            where: {
                name: name
            }
        })
    }

    async updateCompetence(id: number, data: updateCompetenceDTO, userId: number): Promise<Competence> {
        const { name } = data
        const isAdmin = await this.userService.isAdmin(userId)

        const target = await prisma.competence.findUnique({
            where: {
                id: id
            }
        })

        if(!target)
            throw new Error("Competence not found")

        const updatedCompetence = await prisma.competence.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        })

        await prisma.log.create({
            data: {
                entityId: target.id,
                entityType: "Compentence",
                entityName: target.name,
                action: "UPDATED",
                oldData: {
                    ...target
                },
                newData: {
                    ...updatedCompetence
                },
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        })
        return {
            ...updatedCompetence
        }
    }
    
    async updateNumOfClasses(id: number): Promise<Competence>{
        const target = await prisma.competence.findUnique({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("Competence not found!")
        
        const numOfClasses = await prisma.class.count({
            where: {
                competences: {
                    some: {
                        id
                    }
                }
            }
        })

        return await prisma.competence.update({
            where: {
                id: id
            },
            data: {
               numOfClasses: numOfClasses 
            }
        })
    }

    async deleteCompetence(id: number, userId: number): Promise<boolean> {
        const isAdmin = await this.userService.isAdmin(userId)
        const target = await prisma.competence.findUnique({
            where: {
                id: id
            }
        })

        if(!target)
            throw new Error("Competence not found")
        
        await prisma.competence.delete({
            where: {
                id: id
            }
        })

        await prisma.log.create({
            data: {
                action: "DELETED",
                entityType: "Compentence",
                entityId: target.id,
                entityName: target.name,
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


}