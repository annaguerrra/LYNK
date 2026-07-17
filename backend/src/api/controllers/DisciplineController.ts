import { getBucket } from "#infrastructure/database/database.js"
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js"
import { DisciplineService } from "#infrastructure/services/Discipline/discipline.service.js"
import { UserService } from "#infrastructure/services/User/UserService.js"

export default class DisciplineController{
    private attachmentService = new AttachmentService(getBucket())
    private userService = new UserService(this.attachmentService)
    private disciplineService = new DisciplineService(this.userService)
}