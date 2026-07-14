import { registerCompetenceDTO, updateCompetenceDTO } from "#application/dtos/competenceDTO.js";
import { ICompetenceService } from "#application/services/Competence/ICompetence.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Competence } from "#infrastructure/prisma/generated/prisma/client.js";

export class CompetenceService implements ICompetenceService {

    async registerCompetence(data: registerCompetenceDTO, userId: number): Promise<Competence> {
        const { name } = data
        const createdCompetence = await prisma.competence.create({
            data: { name }
        })

        await prisma.log.create({
            data: {
                action: "CREATED",
                entityType: "Compentence",
                entityId: createdCompetence.id,
                oldData: {},
                updatedAt: new Date(),
                newData: {
                    ...createdCompetence
                },
                instructorId: userId
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
                action: "UPDATED",
                oldData: {
                    ...target
                },
                newData: {
                    ...updatedCompetence
                },
                instructorId: userId
            }
        })
        return {
            ...updatedCompetence
        }
    }

    async deleteCompetence(id: number, userId: number): Promise<boolean> {
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
                oldData: {
                    ...target
                },
                newData: {},
                instructorId: userId
            }
        })

        return true
    }

}