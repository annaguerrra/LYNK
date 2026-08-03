import { changePasswordDTO, registerAdminDTO, registerInstructorDTO, registerStudentDTO, resetPasswordDTO, updateAdminDTO, updateInstructorDTO, updateStudentDTO } from "#application/dtos/userDTO.js";
import { UserType } from "#infrastructure/prisma/generated/prisma/enums.js";
import { UserService } from "#infrastructure/services/User/UserService.js";
import { Request, response, Response } from "express";

export default class UserController {
    constructor (
        private readonly userService: UserService
    ) {}

    // POST
    // gets the userid from request and based on userType calls the respective service
    async register(req: Request, res: Response){
        const data: (registerStudentDTO | registerInstructorDTO | registerAdminDTO) = req.body
        const userId = req.user.userId

        try {
            if (data.userType === UserType.STUDENT) {
                const createdUser = await this.userService.registerStudent(data as registerStudentDTO, userId)
                return res.status(200).send({ 
                    response: "User created!",
                    data: createdUser
                })
            } 
            
            if (data.userType === UserType.INSTRUCTOR || data.userType === UserType.ADMIN) {
                await this.userService.registerInstructor(data as registerInstructorDTO, userId)
                return res.status(200).send({ response: "User created!"})
            }

            if (data.userType === UserType.ADMIN) {
                await this.userService.registerAdmin(data as registerAdminDTO, userId)
                return res.status(200).send({ response: "User created!"})
            }
            
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // POST
    // receives the login data through request. Attempts to call the login service while passing the provided data
    async login(req: Request, res: Response) {
        const { username, password} = req.body

        try{
            const loginResponse = await this.userService.login({
                username: username,
                password: password
            });

            return res.status(200).send({ response: loginResponse });
        } catch(e) {
            console.log(e)
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // get all users
    async showAll(req: Request, res: Response) {
        try {
            const users = await this.userService.showAll()
            return res.status(200).send({ response: users })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET 
    // get all the users registered in a specific user table
    async showStudents(req: Request, res: Response){
        try {
            const students = await this.userService.showStudents()
            return res.status(200).send({ response: students })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    async showInstructors(req: Request, res: Response){
        try {
            const instructors = await this.userService.showInstructors()
            return res.status(200).send({ response: instructors })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    async showAdmins(req: Request, res: Response){
        try {
            const admins = await this.userService.showAdmins()
            return res.status(200).send({ response: admins })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    async showInstructor(req: Request, res: Response){
        const { id } = req.params
        try {
            const instructor = await this.userService.showInstructor(Number(id))
            return res.status(200).send({ response: instructor })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    async showAdmin(req: Request, res: Response){
        const { id } = req.params
        try {
            const admin = await this.userService.showAdmin(Number(id))
            return res.status(200).send({ response: admin })
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // PUT
    // resets another user's password
    async resetPassword(req: Request, res: Response) {
        const data: resetPasswordDTO = req.body;
        const userId = req.user.userId
        const userType = data.userType
        const { id } = req.params

        try {
            await this.userService.resetPassword(data, userId, Number(id), userType);
            return res.status(200).send("Password updated!");
        } catch(e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // PUT
    // changes user's password. Used when the user makes the first access, expired password or when the user forgets the password. 
    // UserId and usertype are from jwt token (middleware) and the new password from body request
    async changePassword(req: Request, res: Response) {
        const data: changePasswordDTO = req.body;
        const userId = req.user.userId
        const userType = req.user.usertype

        try{
            await this.userService.changePassword(data, userId, userType);
            return res.status(200).send({response: "Password updated"});
        } catch(e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    async deleteInstructor(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId

        try {
            await this.userService.deleteInstructor(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    async deleteAdmin(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId

        try {
            await this.userService.deleteAdmin(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            if (e instanceof Error)
                return res.status(404).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }
}
