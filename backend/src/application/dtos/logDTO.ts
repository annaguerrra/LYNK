import { Action, EntityType } from "#infrastructure/prisma/generated/prisma/enums.js";

export interface showLogDTO{
    entityType: EntityType
    entityName: string
    action: Action
    updatedAt: Date
    userId: number
}