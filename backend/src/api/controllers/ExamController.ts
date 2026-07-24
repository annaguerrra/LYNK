import { attachtFileDTO, registerExamDTO, updateExamDTO } from "#application/dtos/examDTO.js";
import { getBucket } from "#infrastructure/database/database.js"
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js"
import { HashService } from "#infrastructure/services/Authetication/Hash.service.js";
import { JwtTokenService } from "#infrastructure/services/Authetication/JwtToken.service.js";
import { ExamService } from "#infrastructure/services/Exam/ExamService.js"
import { UserService } from "#infrastructure/services/User/UserService.js"
import { Request, response, Response } from "express";

export default class ExamController{
    private attachmentService = new AttachmentService()
    private hashService = new HashService()
    private jwtTokenService = new JwtTokenService()
    private userService = new UserService(this.attachmentService, this.hashService, this.jwtTokenService)
    private examService = new ExamService(this.attachmentService, this.userService)


    // POST
    //// gets the userid from request and based on data from calls the respective service to create a new Exam
    async register(req: Request, res: Response){
        const data: registerExamDTO = req.body
        const userId = req.user.userId
        try {
            await this.examService.registerExam(data, userId)
            return res.status(200).send({ response: "Exam created!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    // POST 
    // receives the exam's data from body and the userId is obtained from request to execute log record
    async attachFile(req: Request, res: Response){
        const data: attachtFileDTO = req.body
        const userId = req.user.userId
        try {
            await this.examService.attachtFile(data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Exam not found!" })
        }
    }

    // GET 
    // get all the exams registered
    async showExams(req: Request, res: Response){
        try {
            const exams = await this.examService.showExams()
            return res.status(200).send({ response: exams })
        } catch (e) {
            return res.status(404).send({ response: "Exam not found!" })
        }
    }

    // GET 
    // get a specific exam registered through id from params
    async getExam(req: Request, res: Response){
        const { id } = req.params
        try {
            const exam = await this.examService.getExamById(Number(id))
            return res.status(200).send({ response: exam })
        } catch (e) {
            return res.status(404).send({ response: "Exam not found" })
        }
    }

    // GET
    // through the params get all exam's related info and pass it to the download service
    async download(req: Request, res: Response){
        const { id } = req.params
        const { examAttachmentId } = req.params
        try {
            const downloadedExam = await this.examService.downloadExam(Number(id), Number(examAttachmentId))
            return res.status(200).send({ response: downloadedExam })
        } catch (e) {
            return res.status(404).send({ response: "Exam not found!" })
        }
    }

    // PUT
    // updates one or more fields for a exam user based on body data. The authenticated userid its from the request,
    // while the id provided in params identifies the exam whose page is being updated
    async update(req: Request, res: Response){
        const data: updateExamDTO = req.body
        const userId = req.user.userId
        const { id } = req.params
        try {
            await this.examService.updateExam(Number(id), data, userId)
            return res.status(200).send({ response: "Exam created!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }

    // DELETE
    // delete all related information of a material. The userId is obtained from request to execute log record
    async delete(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId
        try {
            await this.examService.removeExam(Number(id), userId)
            return res.status(200).send({ response: "Exam created!"})
        } catch (e) {
            return res.status(500).send({ response: e })
        }
    }
}