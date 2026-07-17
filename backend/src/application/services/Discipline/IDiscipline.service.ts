import { assignCompetencyDTO, DisciplineDTO, editDisciplineDTO, findAllDTO, viewCompetencesDTO, viewMaterialsDTO } from "#application/dtos/disciplineDTO.js";
import { Discipline } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IDisciplineService{
     // post
        create(payload: DisciplineDTO): Promise<Discipline>;
        assignCompetency(payload: assignCompetencyDTO, userId:number): Promise<Discipline>;
        // get
        findAll(): Promise<findAllDTO[]>;
        findOne(id: number): Promise<Discipline>;
        viewClasses(id: number): Promise<string>
        viewMaterials(disciplineID: number): Promise<viewMaterialsDTO>
        viewCompetences(disciplineID: number): Promise<viewCompetencesDTO>;
        downloadContent(disciplineID: number): Promise<Buffer>
        // delete
        delete(disciplineID: number, userId: number): Promise<boolean>;
        // put
        edit(payload: DisciplineDTO, disciplineID: number):  Promise<editDisciplineDTO>;
}