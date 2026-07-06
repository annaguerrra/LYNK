import { registerAreaDTO, showAreaDTO } from "#application/dtos/areaDTO.js";
import { prisma } from "#infrastructure/lib/prisma.js";

export const registerArea = async(data: registerAreaDTO) => {
    const { name } = data

    return await prisma.area.create({
        data: { name }
    })
}

export const showAreas = async() => {
    return await prisma.area.findMany()
}

export const showArea = async(id: number, data: showAreaDTO) => {
    const { name } = data

    return await prisma.area.findFirst({
        where: {
            id: id
        }
    })
}