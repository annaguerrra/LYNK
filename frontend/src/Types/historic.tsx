import type { showStudentDTO } from "./user";
export type Actions = "POST" | "PUT" | "DELET";

export interface HistoricDTO {
    updatedAt: Date,
    action: Actions,
    entityName: String
    alterUser: showStudentDTO
}