import { DisciplineDTO, assignCompetencyDTO, findAllDTO, viewMaterialsDTO, viewCompetencesDTO, editDisciplineDTO, findOneDTO, viewClassesDTO } from "#application/dtos/disciplineDTO.js";
import { IDisciplineService } from "#application/services/Discipline/IDiscipline.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Discipline } from "#infrastructure/prisma/generated/prisma/client.js";

export class DisciplineService implements IDisciplineService{
    async create(payload: DisciplineDTO): Promise<Discipline> {
        const area = await prisma.area.findUnique({ where:{ id: payload.areaID }});

        if(!area){
            throw new Error("Area not Found");
        }

        const target = await prisma.discipline.create({
            data:{
                name: payload.name,
                workLoad: payload.workload,
                areaId: area.id               
            }
        });

        await prisma.log.create({
            data:{
                action: "CREATED",
                entityId: target.id,
                entityType: "Discipline",
                newData: {
                    ...target
                },
                oldData: {},
                instructorId: payload.userID,
                updatedAt: new Date()
            }
        });

        return target;
    }
    async assignCompetency(payload: assignCompetencyDTO, userId: number): Promise<Discipline> {
        const competence = await prisma.competence.findUnique({ 
            where:{ 
                id: payload.competencyID
            }
        });

        if(!competence){
            throw new Error("Discipline not Found");
        }

        const oldData = await prisma.discipline.findUnique({ 
            where:{ 
                id: payload.disciplineID
            }
        });

        if(!oldData){
            throw new Error("Discipline not Found");
        }

        const updatedData = await prisma.discipline.update({
            where:{
                id: payload.disciplineID
            },
            data:{
                competences:{
                    connect:{
                        id: competence.id
                    }
                }
            }
        });

        await prisma.log.create({
            data:{
                action:"UPDATED",
                entityId: updatedData.id,
                entityType: "Discipline",
                oldData: {
                    ...oldData
                },
                newData:{
                    ...updatedData
                },
                instructorId: userId,
                updatedAt: new Date()
            }
        })

        return updatedData;
    }
    async findAll(): Promise<findAllDTO[]> {
        const target = await prisma.discipline.findMany({
            select:{
                id: true,
                name: true,
                area:{
                    select:{
                        name: true
                    }
                },
                competences:{
                    select:{
                        name: true
                    }
                }
            }
        });

        if(!target){
            throw new Error("Not Disciplines Found");
        }

        const log = await prisma.log.findMany({
            where:{
                entityId: {
                    in: target.map((item) => item.id)
                },
                entityType: "Discipline"
            }
        });

        if(!log){
            throw new Error("No register found");
        }

        return target.map((disc) => {
            const lastUpdate = log.find(
                (log) => log.entityId === disc.id
            );

            return {
                name: disc.name,
                area:{
                    name: disc.area.name
                },
                competences: disc.competences.map((competence) => {
                    return{
                        name: competence.name
                    }
                }),
                lastUpdate: lastUpdate?.updatedAt ?? null
            }
        });


    }
    async findOne(id: number): Promise<findOneDTO> {
        const target = await prisma.discipline.findUnique({
            where: { id: id}
        });

        if(!target){
            throw new Error("Discipline Not Found");
        }
        const area = await prisma.area.findUnique({
            where:{ id: target?.areaId},
            select:{
                name: true
            }
        });
        if(!area){
            throw new Error("Area Not Found");
        }
        const competence = await prisma.competence.findMany({
            where:{
                classes:{
                   some:{ id: target?.id} 
                }
            },
            select:{
                name: true
            }
        });

        const log = await prisma.log.findFirst({
            where:{
                entityId: id,
                entityType: "Discipline"
            }
        });

        const lastUpdate = log?.updatedAt;

        return {
            id: target.id,
            name: target.name,
            workLoad: target.workLoad,
            area: area,
            competences: competence,
            lastUpdate: lastUpdate,
        }
    }
    async viewClasses(id: number): Promise<viewClassesDTO[]> {
        const target = await prisma.discipline.findMany({
            where:{
                id: id
            },
            select:{
                name: true,
                classes:{
                    select:{
                        name: true
                    }
                }
            }
        });

        if(!target){
            throw new Error("Not Classes Found");
        }

        return target;
    }
    async viewMaterials(disciplineID: number): Promise<viewMaterialsDTO> {
        throw new Error("Method not implemented.");
    }
    async viewCompetences(disciplineID: number): Promise<viewCompetencesDTO> {
        throw new Error("Method not implemented.");
    }
    async downloadContent(disciplineID: number): Promise<Buffer> {
        throw new Error("Method not implemented.");
    }
    async delete(disciplineID: number, userId: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async edit(payload: DisciplineDTO, disciplineID: number): Promise<editDisciplineDTO> {
        throw new Error("Method not implemented.");
    }

}