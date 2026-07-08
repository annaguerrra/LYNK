import { registerCompetenceDTO, updateCompetenceDTO } from "#application/dtos/competenceDTO.js";
import { Area, Compentence } from "#infrastructure/prisma/generated/prisma/client.js";

export interface ICompetenceService {
    registerCompetence(data: registerCompetenceDTO): Promise<Compentence>
    showCompetences(): Promise<Compentence[]>
    getCompetenceByName(name: string): Promise<Area | null>
    updateCompetence(id: number, data: updateCompetenceDTO): Promise<Area>
    deleteCompetence(id: number): Promise<void>
}