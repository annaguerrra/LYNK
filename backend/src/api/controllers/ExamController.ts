import { attachtFileDTO, registerExamDTO, updateExamDTO } from "#application/dtos/examDTO.js";
import { ExamService } from "#infrastructure/services/Exam/ExamService.js"
import { numberParser } from "config/parser";
import { Request, Response } from "express";

export default class ExamController{
    constructor (
        private readonly examService: ExamService
    ) {}

    // POST
    //// gets the userid from request and based on data from calls the respective service to create a new Exam
    async register(req: Request, res: Response){
        try {
            const userId = req.user.userId

            const files = (req.files as Express.Multer.File[]).map(file => ({
                originalName: file.originalname,
                mimeType: file.mimetype,
                buffer: file.buffer
            }))

            const competencesId = Array.isArray(req.body.competencesId)
                ? req.body.competencesId
                : [req.body.competencesId];
            
            const data: registerExamDTO = {
                name: req.body.name,
                files,
                disciplineId: Number(req.body.disciplineId),
                competencesId: competencesId.map(Number)
            }

            await this.examService.registerExam(data, userId)
            return res.status(200).send({ response: "Exam created!"})
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // POST
    // receives the exam's data from body and the userId is obtained from request to execute log record
    async attachFile(req: Request, res: Response){
        try {
            const userId = req.user.userId

            const files = (req.files as Express.Multer.File[]).map(file => ({
                originalName: file.originalname,
                mimeType: file.mimetype,
                buffer: file.buffer
            }))

            const data: attachtFileDTO = {
                id: Number(req.params.id),
                files
            }

            await this.examService.attachtFile(data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET 
    // get all the exams registered
    async showExams(req: Request, res: Response){
        try {
            const exams = await this.examService.showExams()
            return res.status(200).send({ response: exams })
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // through the params get all exam's related info and pass it to the download service
    async download(req: Request, res: Response){
        const { id, examAttachmentId } = req.params
        try {
            const file = await this.examService.downloadExam(Number(id), Number(examAttachmentId))
            res.setHeader("Content-Type", file.mimeType);
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${file.fileName}"`
            );
            file.stream.pipe(res)
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
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
            return res.status(200).send({ response: "Exam updated!"})
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // DELETE
    // delete all related information of a material. The userId is obtained from request to execute log record
    async delete(req: Request, res: Response){
        const { id } = req.params
        const userId = req.user.userId
        try {
            await this.examService.removeExam(Number(id), userId)
            return res.status(200).send({ response: "Exam deleted!"})
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }
}