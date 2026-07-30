import { assignCompetencyDTO, DisciplineDTO, editDisciplineDTO, findOneDTO, viewClassesDTO } from "#application/dtos/disciplineDTO.js";
import { Discipline } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IDisciplineService{
        // post
        create(payload: DisciplineDTO, userID: number): Promise<Discipline>;
        assignCompetence(payload: assignCompetencyDTO, userId:number): Promise<Discipline>;
        duplicate(id: number, userId: number): Promise<Discipline>
        // get
        findAll(): Promise<number[]>;
        findOne(id: number): Promise<findOneDTO>;
        getColor(id: number) : Promise<string>;
        viewClasses(id: number): Promise<viewClassesDTO[]>
        viewExams(id: number): Promise<number[]>
        viewMaterials(disciplineID: number): Promise<number[]>
        viewCompetences(disciplineID: number): Promise<number[]>;
        
        // delete
        delete(disciplineID: number, userId: number): Promise<boolean>;
        deleteMany(disciplinesId: number[]): Promise<boolean>
        // put
        edit(payload: DisciplineDTO, disciplineID: number, userID: number):  Promise<editDisciplineDTO>;
        updateWorkLoad(id: number): Promise<Discipline>
}