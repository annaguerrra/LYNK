import MaterialController from "#api/controllers/MaterialController.js"
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js"
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js"
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js"
import { MaterialService } from "#infrastructure/services/Material/MaterialService.js"
import { UserService } from "#infrastructure/services/User/UserService.js"

export function makeMaterialController() {
    const attachmentService = new AttachmentService()
    const hashService = new HashService()
    const jwtTokenService = new JwtTokenService()
    
    const userService = new UserService(
        attachmentService,
        hashService,
        jwtTokenService
    )

    const materialService = new MaterialService(
        userService,
        attachmentService
    )

    return new MaterialController(materialService)
}