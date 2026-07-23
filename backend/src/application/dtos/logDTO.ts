import { Action, EntityType } from "#infrastructure/prisma/generated/prisma/enums.js";

// response to all gets in log
export interface showLogDTO{
    entityType: EntityType
    entityName: string
    action: Action
    updatedAt: Date
    userId: number
}