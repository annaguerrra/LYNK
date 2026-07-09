import { registerCompetenceDTO, updateCompetenceDTO } from "#application/dtos/competenceDTO.js";
import { ICompetenceService } from "#application/services/Competence/ICompetence.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Competence } from "#infrastructure/prisma/generated/prisma/client.js";

export class CompetenceService implements ICompetenceService {

    async registerCompetence(data: registerCompetenceDTO): Promise<Competence> {
        const { name } = data
        return await prisma.competence.create({
            data: { name }
        })
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

    async updateCompetence(id: number, data: updateCompetenceDTO): Promise<Competence> {
        const { name } = data
        return await prisma.competence.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        })
    }

    async deleteCompetence(id: number): Promise<void> {
        await prisma.competence.delete({
            where: {
                id: id
            }
        })
    }

}