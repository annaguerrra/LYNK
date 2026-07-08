import { registerAreaDTO} from "#application/dtos/areaDTO.js";
import { Area } from "#infrastructure/prisma/generated/prisma/client.js";

export interface IAreaService {
    registerArea(data: registerAreaDTO): Promise<Area>
    showAreas(): Promise<Area[]>
    updateArea(id: number, data: registerAreaDTO): Promise<Area>
    deleteArea(id: number): Promise<void>
}