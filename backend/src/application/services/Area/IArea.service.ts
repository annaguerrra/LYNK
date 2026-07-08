import { registerAreaDTO, showAreaDTO } from "#application/dtos/areaDTO.js";
import { Area } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IAreaService {
    registerArea(data: registerAreaDTO): Promise<Area>
    showAreas(): Promise<Area[]>
    showArea(id: number): Promise<showAreaDTO | null>
}