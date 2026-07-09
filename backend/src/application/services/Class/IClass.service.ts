import { ClassDTO } from "#application/dtos/classDTO.js";
import { Class } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IClassService{
    create(payload: ClassDTO, disciplineId: number, instructorId: number): Promise<Class>;
    findAll(): Promise<Class[]>;
    findOne(id: number): Promise<ClassDTO>;
    viewCompetencies(id: number): Promise<string[]>;
    delete(id: number): Promise<string>;
    edit(payload: ClassDTO):  Promise<Class>;
}