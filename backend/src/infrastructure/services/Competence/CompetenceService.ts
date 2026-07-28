import { registerCompetenceDTO, updateCompetenceDTO } from "#application/dtos/competenceDTO.js";
import { ICompetenceService } from "#application/services/Competence/ICompetence.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Competence } from "#infrastructure/prisma/generated/prisma/client.js";
import { UserService } from "../User/UserService.js";

export class CompetenceService implements ICompetenceService {
    constructor(private userService: UserService) {}

    async registerCompetence(data: registerCompetenceDTO, userId: number): Promise<Competence> {
        // variables used to create competence
        const { name } = data
        // consults if user creating the competence is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)

        // variables used to create competence
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
                // uses isAdmin variable to determin if log registers an admin ou an instructor
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: username
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
        // variables used to update competence
        const { name } = data
        // consults if user updating the competence is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)

        // variable used to search if the competence is valid
        const target = await prisma.competence.findUnique({
            where: {
                id: id
            }
        })

        if(!target)
            throw new Error("Competence not found")

        // updates necessary data at competence
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
                // uses isAdmin variable to determin if log registers an admin ou an instructor
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: username
            }
        })
        return {
            ...updatedCompetence
        }
    }
    
    // service used to update num of classes attached to a competence
    // will be used inside other services so it's not necessary to log update or check user access
    async updateNumOfClasses(id: number): Promise<Competence>{
        const target = await prisma.competence.findUnique({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("Competence not found!")
        
        // stores num of classes where competenceId is in class competence list
        const numOfClasses = await prisma.class.count({
            where: {
                competences: {
                    some: {
                        id
                    }
                }
            }
        })

        // updated only numOfClasses inside competence
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
        // consults if user deleting the competence is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)
        // variable used to search if the competence is valid
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
                // uses isAdmin variable to determin if log registers an admin ou an instructor
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: username
            }
        })

        return true
    }

    async deleteMany(competencesId: number[]): Promise<boolean> {
        try {
            await prisma.competence.deleteMany({
                where: {
                    id: {
                        in: competencesId
                    }
                }
            })

        } catch (e) {
            throw e
        }
        return true
    }
}