import { registerAreaDTO, updateAreaDTO} from "#application/dtos/areaDTO.js";
import { IAreaService } from "#application/services/Area/IArea.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Area } from "#infrastructure/prisma/generated/prisma/client.js";
import { UserService } from "../User/UserService.js";

export class AreaService implements IAreaService{
    constructor(
        private readonly userService: UserService
    ) {}

    async registerArea(data: registerAreaDTO, userId: number): Promise<Area> {
        // variables used to create area
        const { name, color } = data
        // consults if user creating the area is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)
        
        const createdArea =  await prisma.area.create({
            data: { name, color }
        })

        await prisma.log.create({
            data: {
                action: "CREATED",
                entityType: "Area",
                entityId: createdArea.id,
                entityName: createdArea.name,
                oldData: {},
                newData: {
                    ...createdArea
                },
                // uses isAdmin variable to determin if log register an admin ou an instructor
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: username
            }
        })

        return createdArea
    }
    
    async showAreas(): Promise<Area[]> {
        return await prisma.area.findMany({
            select: {
                id: true,
                name: true,
                color: true
            }
        })
    }
    
    async updateArea(id: number, data: updateAreaDTO, userId: number): Promise<Area> {
        // variables used to update area
        const { name, color } = data
        // consults if user updating the area is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)

        // variable used to search if the area is valid
        const target = await prisma.area.findUnique({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("Class not found")

        // variable used to update area
        const updatedArea = await prisma.area.update({
            where: {
                id: id
            },
            data: {
                name: name,
                color: color
            }
        })

        await prisma.log.create({
            data: {
                entityId: target.id,
                entityType: "Area",
                entityName: target.name,
                action: "UPDATED",
                // uses target to register data before update
                oldData: {
                    ...target
                },
                newData: {
                    ...updatedArea 
                },
                // uses isAdmin variable to determine if log registers an admin ou an instructor
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: username
            }
        })

        return updatedArea
     
    }

    async deleteArea(id: number, userId: number): Promise<boolean> {
        // consults if user deleting the area is admin
        const isAdmin = await this.userService.isAdmin(userId)
        const username = await this.userService.getUsername(userId)
        
        // variable used to search if the area is valid
        const target = await prisma.area.findUnique({
            where: {
                id: id
            },
            // includes disciplines to object to valide delete rules
            include: {
                disciplines: true
            }
        })

        if (!target)
            throw new Error("Area not found")

        if (target.disciplines.length != 0)
            throw new Error("It's not possible to delete the area with disciplines still attached!")

        await prisma.area.delete({
            where: {
                id: id
            }
        })

        await prisma.log.create({
            data: {
                action: "DELETED",
                entityType: "Area",
                entityId: target.id,
                entityName: target.name,
                oldData: {...target},
                newData: {},
                // uses isAdmin variable to determin if log registers an admin ou an instructor
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId }),
                username: username
            }
        })

        return true
    }

    async deleteMany(areasId: number[]): Promise<boolean> {
        try {
            await prisma.area.deleteMany({
                where: {
                    id: {
                        in: areasId
                    }
                }
            })

        } catch (e) {
            throw e
        }
        return true
    }
}