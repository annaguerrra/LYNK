import { attachtFileDTO, registerExamDTO, updateExamDTO } from "#application/dtos/examDTO.js";
import { getBucket } from "#infrastructure/database/database.js"
import { AttachmentService } from "#infrastructure/services/Attachment/AttachmentService.js"
import { ExamService } from "#infrastructure/services/Exam/ExamService.js"
import { UserService } from "#infrastructure/services/User/UserService.js"
import { Request, response, Response } from "express";

export default class ExamController{
    private attachmentService = new AttachmentService(getBucket())
    private userService = new UserService(this.attachmentService)
    private examService = new ExamService(this.attachmentService, this.userService)

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

    async showExams(req: Request, res: Response){
        try {
            await this.examService.showExams()
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Exam not found!" })
        }
    }

    async getExam(req: Request, res: Response){
        const { id } = req.params
        try {
            await this.examService.getExamById(Number(id))
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Exam not found" })
        }
    }

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

    async download(req: Request, res: Response){
        const { examId } = req.params
        const { examAttachmentId } = req.params
        try {
            await this.examService.downloadExam(Number(examId), Number(examAttachmentId))
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            return res.status(404).send({ response: "Exam not found!" })
        }
    }
}