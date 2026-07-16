import { registerAdminDTO, registerInstructorDTO, registerStudentDTO } from "#application/dtos/userDTO.js";
import { UserType } from "#infrastructure/prisma/generated/prisma/enums.js";
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js";
import { UserService } from "#infrastructure/services/User/UserService.js";
import { Request, Response } from "express";
import { getBucket } from '#infrastructure/database/database.js';

export default class UserController {
    private attachmentService = new AttachmentService(getBucket());
    private userService = new UserService(this.attachmentService);

    async register(req: Request, res: Response){
        const data: (registerStudentDTO | registerInstructorDTO | registerAdminDTO) = req.body
        const userId = req.user.userId

        try {
            if (data.userType === UserType.STUDENT) {
                await this.userService.registerStudent(data as registerStudentDTO, userId)
                return res.status(200).send({ response: "User created!"})
            } 
            
            if (data.userType === UserType.INSTRUCTOR) {
                await this.userService.registerInstructor(data as registerInstructorDTO, userId)
                return res.status(200).send({ response: "User created!"})
            }

            if (data.userType === UserType.ADMIN) {
                await this.userService.registerAdmin(data as registerAdminDTO, userId)
                return res.status(200).send({ response: "User created!"})
            }
            
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async showStudents(req: Request, res: Response){
        try {
            await this.userService.showStudents()
            return res.status(200).send({ response: "Success"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async showInstructors(req: Request, res: Response){
        try {
            await this.userService.showInstructors()
            return res.status(200).send({ response: "Success"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    async showAdmins(req: Request, res: Response){
        try {
            await this.userService.showAdmins()
            return res.status(200).send({ response: "Success"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }
}