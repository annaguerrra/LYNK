import { ClassDTO, editClass, findAllDTO, viewCompetencesDTO } from "#application/dtos/classDTO.js";
import { Class } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IClassService{
    create(payload: ClassDTO, disciplineId: number, instructorId: number): Promise<Class>;
    findAll(): Promise<findAllDTO[]>;
    findOne(id: number): Promise<ClassDTO>;
    viewCompetences(id: number): Promise<viewCompetencesDTO>;
    delete(id: number): Promise<boolean>;
    edit(payload: ClassDTO, id: number):  Promise<editClass>;
}