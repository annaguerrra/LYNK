import { showLogDTO } from "#application/dtos/logDTO.js";
import { ILogService } from "#application/services/Log/ILog.service.js";
import { prisma } from "#infrastructure/lib/prisma.js";
import { Log } from "#infrastructure/prisma/generated/prisma/client.js";
import { EntityType, Action } from "#infrastructure/prisma/generated/prisma/enums.js";

export class LogService implements ILogService{
    
    async getAllLogs(): Promise<showLogDTO[]> {
        const logs = await prisma.log.findMany({
            select: {
                entityType: true,
                entityName: true,
                action: true,
                updatedAt: true,
                instructorId: true,
                adminId: true
            }
        })

        // selects log atributes to showLogDTO 
        return logs.map(log => ({
            entityType: log.entityType,
            entityName: log.entityName,
            action: log.action,
            updatedAt: log.updatedAt,
            // fills userId based on user type
            userId: log.adminId ?? log.instructorId!
        }))
    }

    async getLogById(id: number): Promise<Log> {
        const target = await prisma.log.findUnique({
            where: {
                id: id
            }
        })

        if(!target)
            throw new Error("Log not found!")

        return target
    }

    async getLogsByEntityTipe(entityType: EntityType): Promise<showLogDTO[]> {
        // selects logs based on entityType
        const logs = await prisma.log.findMany({
            where: {
                entityType: entityType
            },
            select: {
                entityType: true,
                entityName: true,
                action: true,
                updatedAt: true,
                instructorId: true,
                adminId: true
            }
        })

        return logs.map(log => ({
            entityType: log.entityType,
            entityName: log.entityName,
            action: log.action,
            updatedAt: log.updatedAt,
            // fills userId based on user type
            userId: log.adminId ?? log.instructorId!
        }))
    }
    
    async getLogsByAction(action: Action): Promise<showLogDTO[]> {
        // selects logs based on action
        const logs = await prisma.log.findMany({
            where: {
                action: action
            },
            select: {
                entityType: true,
                entityName: true,
                action: true,
                updatedAt: true,
                instructorId: true,
                adminId: true
            }
        })

        return logs.map(log => ({
            entityType: log.entityType,
            entityName: log.entityName,
            action: log.action,
            updatedAt: log.updatedAt,
            // fills userId based on user type
            userId: log.adminId ?? log.instructorId!
        }))
    }

}