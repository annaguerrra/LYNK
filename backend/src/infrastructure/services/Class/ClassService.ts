import { assignCompetencyDTO, ClassDTO, viewMaterialsDTO, editClass, findAllDTO, viewCompetencesDTO, findOneDTO } from "#application/dtos/classDTO.js";
import { IClassService } from "#application/services/Class/IClass.service.js";
import { Class, Competence, Material } from "#infrastructure/prisma/generated/prisma/client.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { UserService } from "../User/UserService.js";
import { PdfService } from "../Pdf/PdfService.js";
import { CompetenceService } from "../Competence/CompetenceService.js";
import { DisciplineService } from "../Discipline/DisciplineService.js";
import { MaterialService } from "../Material/MaterialService.js";

export class ClassService implements IClassService{
    constructor(
        private userService: UserService,
        private competenceService: CompetenceService,
        private disciplineService: DisciplineService,
        private materialService: MaterialService
    ) {}
    
    async create(payload: ClassDTO, userId: number): Promise<Class> {
        // variables used to create class
        const {name, content, disciplineId} = payload;
        // consults if user creating the class is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)

        const createdClass = await prisma.class.create({
            data:{
                name, 
                content,
                createdAt: new Date(),
                
                discipline:{
                    connect:{
                        id: Number(disciplineId)
                    }
                }
            }
        });

        await this.disciplineService.updateWorkLoad(Number(disciplineId))

        await prisma.log.create({
            data:{
                action:"CREATED",
                entityType: "CLASS",
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
                ...(!isAdmin && { instructorId: userId }),
                username: username
            }
        });

        return createdClass;
    }

    async findAll(): Promise<findAllDTO[]> {
        const classes =  await prisma.class.findMany({
            select:{
                id: true,
                name: true,
                content: true,
                createdAt: true,
                discipline: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                competences: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                materials: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        if(!classes){
            throw new Error("No Class Found!");
        }

        return classes
    }

    async findOne(id: number): Promise<findOneDTO>{
        const target =  await prisma.class.findUnique({
            where: {
                id: id
            },
            select:{
                id: true,
                name: true,
                content: true,
                createdAt: true,
                discipline: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                competences: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                materials: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        if(!target){
            throw new Error("Class not Found!");
        }
    
        return target
    }

    async assignCompetency(payload: assignCompetencyDTO, userId: number): Promise<Class> {
        // consults if user updating the material is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)
        // variables used to update material
        const { id, competencyId } = payload

        const competence = await prisma.competence.findUnique({
            where:{
                id: Number(competencyId)
            } 
        });

        if(!competence){
            throw new Error("Competence not Found!");
        }

        const target =  await prisma.class.findUnique({
            where: {
                id: Number(id)
            }
        });

        if(!target){
            throw new Error("Class not Found!");
        }
        
        // connects competency to class
        const updatedClass = await prisma.class.update({
            where:{
                id: Number(target.id)
            },
            data:{
                competences:{
                    connect:{
                        id: Number(competence.id)
                    }
                }
            }
        });

        await prisma.log.create({
            data:{
                action: "UPDATED",
                entityId: target.id,
                entityType: "CLASS",
                entityName: target.name,
                newData:{
                    ...updatedClass
                },
                oldData:{
                    ...target
                },
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: username
            }
        });

        // updates the number of classes this competency is related
        await this.competenceService.updateNumOfClasses(Number(competencyId))

        return {
            ...updatedClass
        }
    }

    async viewCompetences(id: number): Promise<viewCompetencesDTO> {
        const classes = await prisma.class.findUnique({
            where:{
                id: id
            },
            select:{
                competences:{
                    select:{
                        id: true,
                        name: true,
                        numOfClasses: true
                    }
                }
            }
        }); 
    
        if(!classes){
            throw new Error("Class not Found!");
        }

        return classes
    }
    async viewMaterials(id: number): Promise<viewMaterialsDTO> {
        const target = await prisma.class.findUnique({
            where:{ id: id },
            select:{
                materials:{
                    select: {
                        id: true,
                        name: true,
                        attachments: true
                    }
                }
            }
        });

        if(!target){
            throw("Class not Found!");
        }

        return target
    }

    async viewContent(id: number): Promise<string> {
        const target = await prisma.class.findUnique({
            where:{ id: id },
            select:{ 
                content: true
            }
        });

        if(!target){
            throw new Error("Class not Found!");
        }

        return target.content
    }

    async downloadContent(id: number): Promise<Buffer> {
        const target = await prisma.class.findUnique({
            where: { id: id },
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

    async delete(id: number, userId: number): Promise<boolean> {
        // consults if user deleting the material is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)
        const target = await prisma.class.findUnique({
            where:{
                id: id
            },
            include: {
                competences: true,
                materials: true
            }
        });

       if(!target){
        throw new Error("Class not Found!");
       }

       await prisma.class.delete({
            where:{
                id: id
            },
            include: {
                competences: true,
                materials: true
            }
        });

        await this.disciplineService.updateWorkLoad(Number(target.disciplineId))
        await this.materialService.deleteMany(target.materials.map((material: Material) => material.id))

        await prisma.log.create({
            data:{
                action:"DELETED",
                entityType: "CLASS",
                entityId: target.id,
                entityName: target.name,
                oldData:{},
                updatedAt: new Date(),
                newData:{},
                // uses isAdmin variable to determin if log registers an admin ou an instructor
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: username
            }
        });

        // map all competences attach to this class and update their class number
        await Promise.all(
            target.competences.map((competence: Competence) =>
                this.competenceService.updateNumOfClasses(competence.id)
            )
        )

       return true;
    }

    async deleteMany(classesId: number[]): Promise<boolean> {
        try {
            await prisma.class.deleteMany({
                where: {
                    id: {
                        in: classesId
                    }
                }
            })

        } catch (e) {
            throw e
        }
        return true
    }
    
    async edit(payload: ClassDTO, id: number, userId: number): Promise<editClass> {
        // variables used to update class
        const { name, content} = payload
        // consults if user updating the class is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)
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
                entityType:"CLASS",
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
                // creates files and add them to the uploadedFiles list
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: username
            }
        });

        await this.disciplineService.updateWorkLoad(Number(updatedClass.disciplineId))

        // updates log last update
        const lastUpdate = log.updatedAt;

        return {
            ...updatedClass,
            lastUpdate
        } 
    }   
}