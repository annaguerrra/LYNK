import { registerAreaDTO} from "#application/dtos/areaDTO.js";
import { IAreaService } from "#application/services/Area/IArea.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Area } from "#infrastructure/prisma/generated/prisma/client.js";

export class AreaService implements IAreaService{
    async registerArea(data: registerAreaDTO, userId: number): Promise<Area> {
        const { name } = data
        
        const createdArea =  await prisma.area.create({
            data: { name }
        })

        await prisma.log.create({
            data: {
                action: "CREATED",
                entityType: "Area",
                entityId: createdArea.id,
                oldData: {},
                updatedAt: new Date(),
                newData: {
                    name
                },
                instructorId: userId
            }
        })

        return createdArea
    }
    
    async showAreas(): Promise<Area[]> {
        return await prisma.area.findMany()
    }
    
    async updateArea(id: number, data: registerAreaDTO, userId: number): Promise<Area> {
        const { name } = data
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
                name: name
            }
        })

        await prisma.log.create({
            data: {
                entityId: target.id,
                entityType: "Area",
                action: "UPDATED",
                oldData: {
                    name: target.name
                },
                newData: {
                    name: updatedArea.name 
                },
                instructorId: userId
            }
        })

        return updatedArea
     
    }

    async deleteArea(id: number, userId: number): Promise<boolean> {
        const target = await prisma.area.delete({
            where: {
                id: id
            }
        })

        if (!target)
            throw new Error("Class not found")

        await prisma.log.create({
            data: {
                action: "DELETED",
                entityType: "Area",
                entityId: target.id,
                oldData: {},
                updatedAt: new Date(),
                newData: {},
                instructorId: userId
            }
        })

        return true
    }
}