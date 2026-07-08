import { registerAreaDTO} from "#application/dtos/areaDTO.js";
import { IAreaService } from "#application/services/Area/IArea.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Area } from "#infrastructure/prisma/generated/prisma/client.js";

export class AreaService implements IAreaService{
    async registerArea(data: registerAreaDTO): Promise<Area> {
        const { name } = data
        
        return await prisma.area.create({
            data: { name }
        })
    }
    
    async showAreas(): Promise<Area[]> {
        return await prisma.area.findMany()
    }
    
    async updateArea(id: number, data: registerAreaDTO): Promise<Area> {
        const { name } = data

        return await prisma.area.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        })
    }

    async deleteArea(id: number): Promise<void> {
        await prisma.area.delete({
            where: {
                id: id
            }
        })
    }
}