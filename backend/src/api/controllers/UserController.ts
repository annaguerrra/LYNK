import { registerAdminDTO, registerInstructorDTO, registerStudentDTO, updateAdminDTO, updateInstructorDTO, updateStudentDTO } from "#application/dtos/userDTO.js";
import { UserType } from "#infrastructure/prisma/generated/prisma/enums.js";
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js";
import { UserService } from "#infrastructure/services/User/UserService.js";
import { Request, response, Response } from "express";
import { getBucket } from '#infrastructure/database/database.js';
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js";
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js";

export default class UserController {
    private attachmentService = new AttachmentService()
    private hashService = new HashService()
    private jwtTokenService = new JwtTokenService()
    private userService = new UserService(this.attachmentService, this.hashService, this.jwtTokenService)

    // POST
    // gets the userid from request and based on userType calls the respective service
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
    // POST
    // receives the login data through request. Attempts to call the login service while passing the provided data
    async login(req: Request, res: Response) {
        const { username, password} = req.body

        try{
            await this.userService.login({
                username: username,
                password: password
            });

            return res.status(200).send({response: "Login Successfully"});
        } catch(e) {
            return res.status(404).send({ response: "Failed to Login"});
        }
    }

    // GET 
    // get all the users registered in a specific user table
    async showStudents(req: Request, res: Response){
        try {
            const students = await this.userService.showStudents()
            return res.status(200).send({ response: students })
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async showInstructors(req: Request, res: Response){
        try {
            const instructors = await this.userService.showInstructors()
            return res.status(200).send({ response: instructors })
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async showAdmins(req: Request, res: Response){
        try {
            const admins = await this.userService.showAdmins()
            return res.status(200).send({ response: admins })
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    // GET
    // get all information of a specific user. The userId comes from request
    async showStudent(req: Request, res: Response){
        const { id } = req.params
        try {
            const student = await this.userService.showStudent(Number(id))
            return res.status(200).send({ response: student })
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async showInstructor(req: Request, res: Response){
        const { id } = req.params
        try {
            const instructor = await this.userService.showInstructor(Number(id))
            return res.status(200).send({ response: instructor })
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    async showAdmin(req: Request, res: Response){
        const { id } = req.params
        try {
            const admin = await this.userService.showAdmin(Number(id))
            return res.status(200).send({ response: admin })
        } catch (e) {
            return res.status(404).send({ response: "User not found!" })
        }
    }

    // PUT
    // updates one or more fields for a specific user. The authenticated userid its from the request,
    // while the userId provided in params identifies the user whose profile page is being updated
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

    // DELETE
    // delete all related information of a user. The userId is provided as a parameter to the service and is also obtained by request to execute log record
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
