import { DownloadedFile } from "#application/dtos/attachmentDTO.js";
import { assignCompetencyDTO, ClassDTO, editClass, findAllDTO, viewCompetencesDTO, viewContentDTO } from "#application/dtos/classDTO.js";
import { Class } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IClassService{
    // post
    create(payload: ClassDTO, disciplineId: number, userId: number): Promise<Class>;
    assignCompetency(payload: assignCompetencyDTO, userId:number): Promise<assignCompetencyDTO>;
    // get
    findAll(): Promise<findAllDTO[]>;
    findOne(id: number): Promise<ClassDTO>;
    viewMaterials(classId: number): Promise<String>
    viewCompetences(classId: number): Promise<viewCompetencesDTO>;
    viewContent(classId: number): Promise<viewContentDTO>
    downloadFiles(classId: number, fileId: string): Promise<DownloadedFile>
    downloadContent(classId: number): Promise<>
    delete(id: number, userId: number): Promise<boolean>;
    edit(payload: ClassDTO, id: number, userId: number):  Promise<editClass>;

}