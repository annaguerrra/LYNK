import CompetenceController from "#api/controllers/CompetenceController.js"
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js"
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js"
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js"
import { CompetenceService } from "#infrastructure/services/Competence/CompetenceService.js"
import { UserService } from "#infrastructure/services/User/UserService.js"

export function makeCompetenceController() {
    const attachmentService = new AttachmentService()
    const hashService = new HashService()
    const jwtTokenService = new JwtTokenService()
    
    const userService = new UserService(
        attachmentService,
        hashService,
        jwtTokenService
    )

    const competenceService = new CompetenceService(
        userService
    )

    return new CompetenceController(competenceService)
}