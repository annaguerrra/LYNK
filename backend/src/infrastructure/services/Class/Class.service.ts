import { ClassDTO } from "#application/dtos/classDTO.js";
import { ClassPayload, IClassService } from "#application/services/Class/IClass.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Class } from "#infrastructure/prisma/generated/prisma/client.js";
import { error } from "node:console";

export class ClassService implements IClassService{
    async create(payload: ClassDTO, disciplineId: number, instructorId: number): Promise<Class> {
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
                newData:{
                    name,
                    content
                },
                oldData:{},
                updatedAt: new Date(),

                instructor:{
                    connect:{
                        id: instructorId
                    }
                }

            }
        });

        return createdClass;
    }
    async findAll(): Promise<Class[]> {
        const classes =  await prisma.class.findMany();

        return classes;
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
    async viewCompetencies(id: number): Promise<string[]> {
        const target = await prisma.class.findMany({
            where:{
                id: id
            },
            select:{
                competences:{
                    select:{
                        name: true
                    }
                }
            }
        });
        
    }
    async delete(id: number): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async edit(payload: ClassPayload): Promise<Class> {
        throw new Error("Method not implemented.");
    }

}