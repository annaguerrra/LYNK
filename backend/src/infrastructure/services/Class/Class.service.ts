import { ClassDTO, editClass, findAllDTO, viewCompetencesDTO } from "#application/dtos/classDTO.js";
import { IClassService } from "#application/services/Class/IClass.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Class, EntityType } from "#infrastructure/prisma/generated/prisma/client.js";

export class ClassService implements IClassService{
    async create(payload: ClassDTO, disciplineId: number, userId: number): Promise<Class> {
        const {name, content} = payload;
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
                oldData:{},
                updatedAt: new Date(),
                newData:{
                    name,
                    content
                },
                instructorId: userId
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

    async delete(id: number, userId: number): Promise<boolean> {
       const target = await prisma.class.delete({
        where:{
            id: id
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
                oldData:{},
                updatedAt: new Date(),
                newData:{},
                instructorId: userId
            }
        });

       return true;
    }
    
    async edit(payload: ClassDTO, id: number, userId: number): Promise<editClass> {
        const { name, content} = payload
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

        await prisma.log.create({
            data:{
                entityId: target.id,
                entityType:"Class",
                action: "UPDATED",
                
                oldData:{
                    name: target.name,
                    content: target.content
                },

                newData: {
                    name: updatedClass.name,
                    content: updatedClass.content
                },
                instructorId: userId
            }
        });
        return {
            ...updatedClass,

        }
    }   

}