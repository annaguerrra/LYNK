import { registerAdminDTO, registerInstructorDTO, registerStudentDTO, updateAdminDTO, updateInstructorDTO, updateStudentDTO } from "#application/dtos/userDTO.js";
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
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async showInstructors(req: Request, res: Response){
        try {
            await this.userService.showInstructors()
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async showAdmins(req: Request, res: Response){
        try {
            await this.userService.showAdmins()
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async showStudent(req: Request, res: Response){
        const { id } = req.params
        try {
            await this.userService.showStudent(Number(id))
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async showInstructor(req: Request, res: Response){
        const { id } = req.params
        try {
            await this.userService.showInstructor(Number(id))
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async showAdmin(req: Request, res: Response){
        const { id } = req.params
        try {
            await this.userService.showAdmin(Number(id))
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async updateStudent(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId
        const data: updateStudentDTO = req.body

        try {
            await this.userService.updateStudent(Number(id), data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async updateInstructor(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId
        const data: updateInstructorDTO = req.body

        try {
            await this.userService.updateInstructor(Number(id), data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async updateAdmin(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId
        const data: updateAdminDTO = req.body

        try {
            await this.userService.updateAdmin(Number(id), data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async deleteStudent(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId

        try {
            await this.userService.deleteStudent(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async deleteInstructor(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId

        try {
            await this.userService.deleteInstructor(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async deleteAdmin(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId

        try {
            await this.userService.deleteAdmin(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }
}