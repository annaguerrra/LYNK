import { ClassPayload, IClassService } from "#application/services/Class/IClass.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Class } from "#infrastructure/prisma/generated/prisma/client.js";

export class ClassService implements IClassService{
    async create(payload: ClassPayload, disciplineId: number, instructorId: number): Promise<Class> {
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
                action:"CLASS_CREATED",
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
    async findOne(payload: ClassPayload, id: number): Promise<Class> {
        const target = await prisma.class.findFirst({
            where:{id}
        });
        if(!target){
            return null;
        }

        const lastUpdate = await prisma.log.findFirst({
            where:{
                
            }
        })
    }
    async viewCompetencies(id: number): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<string> {
        throw new Error("Method not implemented.");
    }
    async edit(payload: ClassPayload): Promise<Class> {
        throw new Error("Method not implemented.");
    }

}