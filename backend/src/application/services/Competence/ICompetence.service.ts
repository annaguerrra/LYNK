import { registerCompetenceDTO, updateCompetenceDTO } from "#application/dtos/competenceDTO.js";
import { Area, Competence } from "#infrastructure/prisma/generated/prisma/client.js";

export interface ICompetenceService {
    registerCompetence(data: registerCompetenceDTO, userId: number): Promise<Competence>
    showCompetences(): Promise<Competence[]>
    getCompetenceByName(name: string): Promise<Area | null>
    updateCompetence(id: number, data: updateCompetenceDTO, userId: number): Promise<Area>
    deleteCompetence(id: number, userId: number): Promise<boolean>
}