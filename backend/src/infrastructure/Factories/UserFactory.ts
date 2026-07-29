import UserController from "#api/controllers/UserController.js";
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js";
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js";
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js";
import { UserService } from "#infrastructure/services/User/UserService.js";

export function makeUserController() {
    const attachmentService = new AttachmentService()
    const hashService = new HashService()
    const jwtTokenService = new JwtTokenService()
    
    const userService = new UserService(
        attachmentService,
        hashService,
        jwtTokenService
    )

    return new UserController(userService)
}