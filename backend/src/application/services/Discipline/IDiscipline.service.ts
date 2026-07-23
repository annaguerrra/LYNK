import { assignCompetencyDTO, DisciplineDTO, editDisciplineDTO, findAllDTO, findOneDTO, viewClassesDTO, viewCompetencesDTO, viewMaterialsDTO } from "#application/dtos/disciplineDTO.js";
import { Discipline } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IDisciplineService{
     // post
        create(payload: DisciplineDTO, userID: number): Promise<Discipline>;
        assignCompetence(payload: assignCompetencyDTO, userId:number): Promise<Discipline>;
        duplicate(id: number): Promise<Discipline>
        // get
        findAll(): Promise<findAllDTO[]>;
        findOne(id: number): Promise<findOneDTO>;
        viewClasses(id: number): Promise<viewClassesDTO[]>
        viewMaterials(disciplineID: number): Promise<viewMaterialsDTO[]>
        viewCompetences(disciplineID: number): Promise<viewCompetencesDTO[]>;
        // delete
        delete(disciplineID: number, userId: number): Promise<boolean>;
        // put
        edit(payload: DisciplineDTO, disciplineID: number, userID: number):  Promise<editDisciplineDTO>;
        updateWorkLoad(id: number): Promise<Discipline>
}