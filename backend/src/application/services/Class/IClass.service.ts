import { assignCompetencyDTO, ClassDTO, editClass, findAllDTO, findOneDTO, viewCompetencesDTO, viewContentDTO, viewMaterialsDTO } from "#application/dtos/classDTO.js";
import { Class } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IClassService{
    // post
    create(payload: ClassDTO, userId: number): Promise<Class>;
    assignCompetency(payload: assignCompetencyDTO, userId:number): Promise<Class>;
    // get
    findAll(): Promise<findAllDTO[]>;
    findOne(id: number): Promise<findOneDTO>;
    viewMaterials(classId: number): Promise<viewMaterialsDTO>
    viewCompetences(classId: number): Promise<viewCompetencesDTO>;
    viewContent(classId: number): Promise<string>
    downloadContent(classId: number): Promise<Buffer>
    // delete
    delete(id: number, userId: number): Promise<boolean>;
    deleteMany(classesId: number[]): Promise<boolean>
    // put
    edit(payload: ClassDTO, id: number, userId: number):  Promise<editClass>;
}