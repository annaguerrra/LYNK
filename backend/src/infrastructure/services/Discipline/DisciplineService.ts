import { DisciplineDTO, assignCompetencyDTO, findAllDTO, viewMaterialsDTO, viewCompetencesDTO, editDisciplineDTO, findOneDTO, viewClassesDTO } from "#application/dtos/disciplineDTO.js";
import { IDisciplineService } from "#application/services/Discipline/IDiscipline.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Discipline } from "#infrastructure/prisma/generated/prisma/client.js";
import { UserService } from "#infrastructure/services/User/UserService.js"

export class DisciplineService implements IDisciplineService{
    constructor(
        private userService: UserService
    ) {}

    async create(payload: DisciplineDTO, userID: number): Promise<Discipline> {
        // consults if user creating the discipline is admin
        const admin = await this.userService.isAdmin(userID)
        // variables used to create discipline
        const { name, workload, areaID } = payload

        const area = await prisma.area.findUnique({ where:{ id: areaID }});

        if(!area){
            throw new Error("Area not Found");
        }

        const target = await prisma.discipline.create({
            data:{
                name: name,
                workLoad: workload,
                areaId: area.id               
            }
        });

        await prisma.log.create({
            data:{
                action: "CREATED",
                entityId: target.id,
                entityName: target.name,
                entityType: "Discipline",
                newData: {
                    ...target
                },
                oldData: {},
                // uses isAdmin variable to determin if log register an admin ou an instructor
                ...(admin && { adminId: userID }),
                ...(!admin && { instructorId: userID }),
                updatedAt: new Date()
            }
        });

        return target;
    }

    async assignCompetence(payload: assignCompetencyDTO, userId: number): Promise<Discipline> {
        // consults if user updating the discipline is admin
        const admin = await this.userService.isAdmin(userId)
        // variables used to assign competence to discipline
        const { disciplineID, competencyID } = payload

        // stores competence data
        const competence = await prisma.competence.findUnique({ 
            where:{ 
                id: competencyID
            }
        });

        if(!competence){
            throw new Error("Discipline not Found");
        }

        const oldData = await prisma.discipline.findUnique({ 
            where:{ 
                id: disciplineID
            }
        });

        if(!oldData){
            throw new Error("Discipline not Found");
        }

        // connects discipline to competence by its id  
        const updatedData = await prisma.discipline.update({
            where:{
                id: disciplineID
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
                entityName: oldData.name,
                oldData: {
                    ...oldData
                },
                newData:{
                    ...updatedData
                },
                // uses isAdmin variable to determin if log registers an admin ou an instructor
                ...(admin && { adminId: userId }),
                ...(!admin && { instructorId: userId }),
                updatedAt: new Date()
            }
        })

        return updatedData;
    }

    // async duplicate(id: number): Promise<Discipline> {
    //     const target = await prisma.discipline.findUnique({
    //         where: {
    //             id: id
    //         },
    //         include: {
    //             materials: true,
    //             competences: true,
    //             classes: true,
    //             exams: true
    //         }
    //     })

    //     if(!target)
    //         throw new Error("Discipline not found!")

    //     const createdDiscipline = await prisma.discipline.create({
    //         data: {
    //             name: target.name,
    //             workLoad: target.workLoad,
    //             areaId: target.areaId,
    //             materials: {
    //                 create: target.materials.map(material => ({
    //                     name: material.name,
    //                     disciplineId: id,
    //                     classId: material.classId
    //                 }))
    //             },
    //             competences: {
    //                 create: target.competences.map(competence => ({
    //                     name: competence.name,
    //                     createdAt: Date.now(),
    //                     numOfClasses: competence.createdAt
    //                 }))
    //             }
    //         }
    //     })
    // }

    async findAll(): Promise<findAllDTO[]> {
        // finds all disciplines and areas and competences connected to them
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

        // maps all logs attached to discipline to track updates
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

        // uses variable log to track last updated to the discipline
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
        // variable used to search if the discipline is valid
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
        // finds discipline and selects it's classes
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

    async viewMaterials(disciplineID: number): Promise<viewMaterialsDTO[]> {
        // finds discipline and selects it's materials
        const target = await prisma.discipline.findMany({
            where:{
                id: disciplineID
            },
            select:{
                name: true,
                materials:{
                    select:{
                        name: true
                    }
                }
            }
        });

        if(!target){
            throw new Error("Not Materials Found");
        }

        return target;
    }

    async viewCompetences(disciplineID: number): Promise<viewCompetencesDTO[]> {
        // finds discipline and selects it's competences
        const target = await prisma.discipline.findMany({
            where:{
                id: disciplineID
            },
            select:{
                name: true,
                competences:{
                    select:{
                        name: true,
                        numOfClasses: true
                    }
                }
            }
        });

        if(!target){
            throw new Error("No Competences Found");
        }

        return target;
    }

    async delete(disciplineID: number, userId: number): Promise<boolean> {
        // consults if user deleting the discipline is admin
        const admin = await this.userService.isAdmin(userId)

        const target = await prisma.discipline.findUnique({ where: { id: disciplineID }});

        if(!target)
            throw new Error("Discipline not found!")

        try{
            await prisma.discipline.delete({
                where:{
                    id: disciplineID
                }
            });

            await prisma.log.create({
                data:{
                    action:"DELETED",
                    entityType: "Discipline",
                    entityId: disciplineID,
                    entityName: target.name,
                    oldData:{
                        ...target
                    },
                    newData: {},
                    updatedAt: new Date(),
                    // uses isAdmin variable to determin if log registers an admin ou an instructor
                    ...(admin && { adminId: userId }),
                    ...(!admin && { instructorId: userId }),
                }
            });
            return true;
        } catch(error){
            throw new Error("Discipline not Found");
        }
    }

    async edit(payload: DisciplineDTO, disciplineID: number, userID: number): Promise<editDisciplineDTO> {
        // consults if user updating the discipline is admin
        const admin = await this.userService.isAdmin(userID)
        // variables used to update discipline
        const { name, workload } = payload

        const target = await prisma.discipline.findUnique({ where: { id: disciplineID }});
        if(!target){
            throw new Error("Discipline Not Found");
        }

        try{
            await prisma.discipline.update({
                where:{
                    id: disciplineID
                },
                data:{
                    name: name,
                    workLoad: workload
                }
            });

            const log = await prisma.log.create({
                data:{
                    action:"UPDATED",
                    entityType: "Discipline",
                    entityId: disciplineID,
                    entityName: target.name,
                    oldData:{
                        ...target
                    },
                    newData: {},
                    updatedAt: new Date(),
                    // uses isAdmin variable to determin if log register an admin ou an instructor
                    ...(admin && { adminId: userID }),
                    ...(!admin && { instructorId: userID }),
                }
            });
            return {
                name: target?.name,
                workload: target?.workLoad,
                lastUpdate: log.updatedAt
            };
        } catch(error){
            throw new Error("Discipline not Found");
        }
    }

    async updateWorkLoad(id: number): Promise<Discipline> {
        const target = await prisma.discipline.findUnique({
            where: {
                id: id
            }
        })

        if(!target)
            throw new Error("Discipline not found!")

        const numOfClasses = await prisma.class.count({
            where: {
                disciplineId: id
            }
        })

        return await prisma.discipline.update({
            where: {
                id: id
            },
            data: {
                workLoad: numOfClasses * 4
            }
        })
    }

}