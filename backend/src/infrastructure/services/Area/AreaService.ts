import { registerAreaDTO, updateAreaDTO} from "#application/dtos/areaDTO.js";
import { IAreaService } from "#application/services/Area/IArea.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Area } from "#infrastructure/prisma/generated/prisma/client.js";
import { UserService } from "../User/UserService.js";

export class AreaService implements IAreaService{
    constructor(private userService: UserService) {}

    async registerArea(data: registerAreaDTO, userId: number): Promise<Area> {
        const { name, color } = data
        const isAdmin = await this.userService.isAdmin(userId)
        
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
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        })

        return createdArea
    }
    
    async showAreas(): Promise<Area[]> {
        return await prisma.area.findMany()
    }
    
    async updateArea(id: number, data: updateAreaDTO, userId: number): Promise<Area> {
        const { name, color } = data
        const isAdmin = await this.userService.isAdmin(userId) 
        const target = await prisma.area.findUnique({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("Class not found")

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
                oldData: {
                    ...target
                },
                newData: {
                    ...updatedArea 
                },
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        })

        return updatedArea
     
    }

    async deleteArea(id: number, userId: number): Promise<boolean> {
        const isAdmin = await this.userService.isAdmin(userId) 
        const target = await prisma.area.findUnique({
            where: {
                id: id
            },
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
                ...(isAdmin && { adminId: userId }),
                ...(!isAdmin && { instructorId: userId })
            }
        })

        return true
    }
}