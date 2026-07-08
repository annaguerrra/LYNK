import { registerCompetenceDTO, updateCompetenceDTO } from "#application/dtos/competenceDTO.js";
import { ICompetenceService } from "#application/services/Competence/ICompetence.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Competence, Area } from "#infrastructure/prisma/generated/prisma/client.js";

export class CompetenceService implements ICompetenceService {

    async registerCompetence(data: registerCompetenceDTO): Promise<Competence> {
        const { name, numOfHours } = data
        return await prisma.competence.create({
            data: { name, numOfHours}
        })
    }
    
    async showCompetences(): Promise<Competence[]> {
        return await prisma.competence.findMany()
    }

    getCompetenceByName(name: string): Promise<Area | null> {
        throw new Error("Method not implemented.");
    }

    updateCompetence(id: number, data: updateCompetenceDTO): Promise<Area> {
        throw new Error("Method not implemented.");
    }

    deleteCompetence(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}