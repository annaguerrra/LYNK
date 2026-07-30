import { assignCompetencyDTO, ClassDTO, editClass, findAllDTO, viewCompetencesDTO, viewContentDTO } from "#application/dtos/classDTO.js";
import { viewMaterialsDTO } from "#application/dtos/materialDTO.js";
import { Class } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IClassService{
    // post
    create(payload: ClassDTO, userId: number): Promise<Class>;
    assignCompetency(payload: assignCompetencyDTO, userId:number): Promise<Class>;
    // get
    findAll(): Promise<number[]>;
    findOne(id: number): Promise<number>;
    viewMaterials(classId: number): Promise<number[]>
    viewCompetences(classId: number): Promise<number[]>;
    viewContent(classId: number): Promise<string>
    downloadContent(classId: number): Promise<Buffer>
    // delete
    delete(id: number, userId: number): Promise<boolean>;
    deleteMany(classesId: number[]): Promise<boolean>
    // put
    edit(payload: ClassDTO, id: number, userId: number):  Promise<editClass>;
}