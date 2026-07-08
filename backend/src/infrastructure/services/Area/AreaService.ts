import { registerAreaDTO, showAreaDTO } from "#application/dtos/areaDTO.js";
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

    async showArea(id: number): Promise<showAreaDTO | null> {
        return await prisma.area.findFirst({
            where: {
                id: id
            },
            select: {
                name: true
            }
        })
    }

}