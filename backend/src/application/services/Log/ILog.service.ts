import { showLogDTO } from "#application/dtos/logDTO.js";
import { Action, EntityType, Log } from "#infrastructure/prisma/generated/prisma/client.js";

export interface ILogService{
    getAllLogs(): Promise<showLogDTO[]>
    getLogById(id: number): Promise<Log>
    getLogsByEntityTipe(entityType: EntityType): Promise<showLogDTO[]>
    getLogsByAction(action: Action): Promise<showLogDTO[]>
}