import { assignCompetencyDTO, ClassDTO, getContentDTO, editClass, findAllDTO, viewCompetencesDTO, viewContentDTO } from "#application/dtos/classDTO.js";
import { IClassService } from "#application/services/Class/IClass.service.js";
import { Class } from "#infrastructure/prisma/generated/prisma/client.js";
import { viewMaterialsDTO } from "#application/dtos/materialDTO.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { UserService } from "../User/UserService.js";
import { PdfService } from "../Pdf/PdfService.js";
import { CompetenceService } from "../Competence/CompetenceService.js";

export class ClassService implements IClassService{
    constructor(
        private userService: UserService,
        private competenceService: CompetenceService
    ) {}
    
    async create(payload: ClassDTO, userId: number): Promise<Class> {
        // variables used to create class
        const {name, content, disciplineId} = payload;
        // consults if user creating the class is admin
        const isAdmin = await this.userService.isAdmin(userId)

        const createdClass = await prisma.class.create({
            data:{
                name, 
                content,
                createdAt: new Date(),
                
                discipline:{
                    connect:{
                        id: disciplineId
                    }
                }
            }
        });

        await prisma.log.create({
            data:{
                action:"CREATED",
                entityType: "Class",
                entityId: createdClass.id,
                entityName: createdClass.name,
                oldData:{},
                updatedAt: new Date(),
                newData:{
                    name,
                    content
                },
                // uses isAdmin variable to determin if log registers an admin ou an instructor
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        });

        return createdClass;
    }

    async findAll(): Promise<findAllDTO[]> {
        const target =  await prisma.class.findMany({
            select:{
                name: true,
                content: true,
                createdAt: true,
                discipline: true,
                competences: true,
                materials: true
            }
        });
        if(!target){
            throw new Error("No Class Found!");
        }
        return target;
    }

    async findOne(id: number): Promise<ClassDTO>{
        const target = await prisma.class.findFirst({
            where:{id}
        });
        if(!target){
            throw new Error("Class not Found!");
        }
        
        // finds class log and updates it's last update date
        const log = await prisma.log.findFirst({
            where:{
                entityId: id,
                entityType: "Class"
            }
        });
        
        const lastUpdate = log?.updatedAt

        return {
            ...target,
            lastUpdate
        }
    }

    async assignCompetency(payload: assignCompetencyDTO, userId: number): Promise<Class> {
        const isAdmin = await this.userService.isAdmin(userId)
        const { classId, competencyId } = payload
        const competence = await prisma.competence.findFirst({
            where:{
                id: competencyId
            } 
        });

        if(!competence){
            throw new Error("Competence not Found!");
        }

        const target = await prisma.class.findFirst({
            where:{
                id: classId
            }
        });
        
        if(!target){
            throw new Error("Class not Found!");
        }
        
        const updatedClass = await prisma.class.update({
            where:{
                id: payload.classId
            },
            data:{
                competences:{
                    connect:{
                        id: payload.competencyId
                    }
                }
            }
        });

        await prisma.log.create({
            data:{
                action: "UPDATED",
                entityId: payload.classId,
                entityType: "Class",
                entityName: target.name,
                newData:{
                    ...updatedClass
                },
                oldData:{
                    ...target
                },
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        });

        await this.competenceService.updateNumOfClasses(competencyId)

        return {
            ...updatedClass
        }
    }

    async viewCompetences(id: number): Promise<viewCompetencesDTO> {
        const target = await prisma.class.findUnique({
            where:{
                id: id
            },
            select:{
                competences:{
                    select:{
                        name: true,
                        numOfClasses: true
                    }
                }
            }
        }); 
    
        if(!target){
            throw new Error("Class not Found!");
        }

        return {
            competences: target.competences
        }
    }
    async viewMaterials(classId: number): Promise<viewMaterialsDTO> {
        const target = await prisma.class.findFirst({
            where:{ id: classId },
            select:{
                materials:{
                    where:{ classId: classId },
                    select:{ name: true }
                }
            }
        });

        if(!target){
            throw("Class not Found!");
        }

        return{
            materials: target.materials
        }
    }

    async viewContent(classId: number): Promise<viewContentDTO> {
        const target = await prisma.class.findFirst({
            where:{ id: classId},
            select:{ 
                name: true,
                content: true
            }
        });

        if(!target){
            throw new Error("Class not Found!");
        }

        return {
            ...target
        }
    }

    async downloadContent(classId: number): Promise<Buffer> {
        const target = await prisma.class.findUnique({
            where: { id: classId },
            select:{
                name: true,
                content: true
            }
        });
        
        if(!target){
            throw new Error("Class not Found");
        }

        const pdf = new PdfService();
        return await pdf.generatePdf(target);
    }

    async getContent(classId: number): Promise<getContentDTO> {
        const target = await prisma.class.findUnique({
            where:{ id: classId },
            select:{
                name: true,
                content: true
            }
        });

        if(!target){
            throw new Error("Class not Found");
        }

        return {
            ...target
        }
    }

    async delete(id: number, userId: number): Promise<boolean> {
        const isAdmin = await this.userService.isAdmin(userId)
        const target = await prisma.class.delete({
            where:{
                id: id
            },
            include: {
                competences: true
            }
        });

       if(!target){
        throw new Error("Class not Found!");
       }

       await prisma.log.create({
            data:{
                action:"DELETED",
                entityType: "Class",
                entityId: target.id,
                entityName: target.name,
                oldData:{},
                updatedAt: new Date(),
                newData:{},
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        });

        await Promise.all(
            target.competences.map(competence =>
                this.competenceService.updateNumOfClasses(competence.id)
            )
        )

       return true;
    }
    
    async edit(payload: ClassDTO, id: number, userId: number): Promise<editClass> {
        const { name, content} = payload
        const isAdmin = await this.userService.isAdmin(userId)
        const target = await prisma.class.findUnique({
            where:{
                id:id
            }
        });

        if(!target){
            throw new Error("Class not Found");
        }

        const updatedClass = await prisma.class.update({
            where:{
                id
            },
            data:{
                name,
                content
            }
        });

        const log = await prisma.log.create({
            data:{
                entityId: target.id,
                entityType:"Class",
                entityName: target.name,
                action: "UPDATED",
                
                oldData:{
                    name: target.name,
                    content: target.content
                },

                newData: {
                    name: updatedClass.name,
                    content: updatedClass.content
                },
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        });

        const lastUpdate = log.updatedAt;

        return {
            ...updatedClass,
            lastUpdate
        } 
    }   
}