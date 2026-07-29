import LogController from "#api/controllers/LogController.js";
import { LogService } from "#infrastructure/services/Log/LogService.js";

export function makeLogController() {
    const logService = new LogService()

    return new LogController(logService)
}