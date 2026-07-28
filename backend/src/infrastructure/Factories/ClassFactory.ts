import { ClassController } from "#api/controllers/ClassController.js"
import CompetenceController from "#api/controllers/CompetenceController.js"
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js"
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js"
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js"
import { ClassService } from "#infrastructure/services/Class/ClassService.js"
import { CompetenceService } from "#infrastructure/services/Competence/CompetenceService.js"
import { DisciplineService } from "#infrastructure/services/Discipline/DisciplineService.js"
import { MaterialService } from "#infrastructure/services/Material/MaterialService.js"
import { UserService } from "#infrastructure/services/User/UserService.js"

export function makeClassController() {
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

    const disciplineService = new DisciplineService(
        userService
    )

    const materialService = new MaterialService(
        userService,
        attachmentService
    )

    const classService = new ClassService(
        userService,
        competenceService,
        disciplineService,
        materialService
    )

    return new ClassController(classService)
}