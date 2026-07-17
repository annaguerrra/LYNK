import { registerAreaDTO, updateAreaDTO} from "#application/dtos/areaDTO.js";
import { Area } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IAreaService {
    registerArea(data: registerAreaDTO, userId: number): Promise<Area>
    showAreas(): Promise<Area[]>
    updateArea(id: number, data: updateAreaDTO, userId: number): Promise<Area>
    deleteArea(id: number, userId: number): Promise<boolean>
}