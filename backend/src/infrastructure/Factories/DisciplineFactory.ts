import { DisciplineController } from "#api/controllers/DisciplineController.js"
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js"
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js"
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js"
import { DisciplineService } from "#infrastructure/services/Discipline/DisciplineService.js"
import { UserService } from "#infrastructure/services/User/UserService.js"

export function makeDisciplineController() {
    const attachmentService = new AttachmentService()
    const hashService = new HashService()
    const jwtTokenService = new JwtTokenService()
    
    const userService = new UserService(
        attachmentService,
        hashService,
        jwtTokenService
    )

    const disciplineService = new DisciplineService(
        userService
    )

    return new DisciplineController(disciplineService)
}