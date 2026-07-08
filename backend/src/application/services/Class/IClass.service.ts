import { Class } from "#infrastructure/prisma/generated/prisma/client.js";

export interface ClassPayload{
    classId: number
    name: string
    content: string
}

export interface IClassService{
    create(payload: ClassPayload, disciplineId: number, instructorId: number): Promise<Class>;
    findAll(): Promise<Class[]>;
    findOne(payload: ClassPayload, id: number):  Promise<Class>;
    viewCompetencies(id: number): Promise<string[]>;
    delete(id: number): Promise<string>;
    edit(payload: ClassPayload):  Promise<Class>;
}