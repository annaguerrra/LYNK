import { registerAdminDTO, registerInstructorDTO, registerStudentDTO } from "#application/dtos/userDTO.js";
import { IAttachmentService } from "#application/services/Attachment/IAttachment.service.js";
import { IUserService } from "#application/services/User/IUser.service.js";
import { UserType } from "#infrastructure/prisma/generated/prisma/enums.js";
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js";
import { UserService } from "#infrastructure/services/User/UserService.js";
import { Request, Response } from "express";
import { GridFSBucket } from "mongodb";

export default class UserController {
    private static bucket = new GridFSBucket(db);
    private static attachmentService = new AttachmentService(this.bucket);
    private static userService = new UserService(this.attachmentService);

    static async register(req: Request, res: Response){
        const data: (registerStudentDTO | registerInstructorDTO | registerAdminDTO) = req.body

        if (data.userType === UserType.STUDENT) {
            await registerStudent()
        }
    }
}