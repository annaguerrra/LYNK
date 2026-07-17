import { DisciplineDTO, assignCompetencyDTO, findAllDTO, viewMaterialsDTO, viewCompetencesDTO, editDisciplineDTO } from "#application/dtos/disciplineDTO.js";
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
        throw new Error("Method not implemented.");
    }
    async findOne(id: number): Promise<Discipline> {
        throw new Error("Method not implemented.");
    }
    async viewClasses(id: number): Promise<string> {
        throw new Error("Method not implemented.");
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