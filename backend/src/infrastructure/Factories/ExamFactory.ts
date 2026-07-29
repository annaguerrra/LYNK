import ExamController from "#api/controllers/ExamController.js"
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js"
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js"
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js"
import { ExamService } from "#infrastructure/services/Exam/ExamService.js"
import { UserService } from "#infrastructure/services/User/UserService.js"

export function makeExamController() {
    const attachmentService = new AttachmentService()
    const hashService = new HashService()
    const jwtTokenService = new JwtTokenService()
    
    const userService = new UserService(
        attachmentService,
        hashService,
        jwtTokenService
    )

    const examService = new ExamService(
        attachmentService, 
        userService
    )

    return new ExamController(examService)
}