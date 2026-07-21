import { showLogDTO } from "#application/dtos/logDTO.js";
import { Action, EntityType, Log } from "#infrastructure/prisma/generated/prisma/client.js";

export interface ILogService{
    getAllLogs(): Promise<showLogDTO[]>
    getLogById(id: number): Promise<Log>
    getLogByEntityTipe(entityType: EntityType): Promise<showLogDTO>
    getLogByAction(action: Action): Promise<showLogDTO>
}