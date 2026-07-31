import { attachtFileDTO, registerMaterialDTO, updateMaterialDTO } from "#application/dtos/materialDTO.js";
import { MaterialService } from "#infrastructure/services/Material/MaterialService.js"
import { Request, Response } from "express";

export default class MaterialController{
    constructor (
        private readonly materialService: MaterialService
    ) {}

    // POST
    // receives all material's related informantion from body, and to execute log record gets the userId from request.
    // The service gets this data as a parameter
    async register(req: Request, res: Response){
        try {
            const userId = req.user.userId

            const files = (req.files as Express.Multer.File[]).map(file => ({
                originalName: file.originalname,
                mimeType: file.mimetype,
                buffer: file.buffer
            }))
            
            const data: registerMaterialDTO = {
                name: req.body.name,
                disciplineId: Number(req.body.disciplineId),
                classId: Number(req.body.classId),
                files
            }

            await this.materialService.registerMaterial(data, userId)
            return res.status(200).send({ response: "Material created!"})
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // POST 
    // receives the material's data from body and the userId is obtained from request to execute log record
    async attachFile(req: Request, res: Response){
        try {
            const userId = req.user.userId

            const files = (req.files as Express.Multer.File[]).map(file => ({
                originalName: file.originalname,
                mimeType: file.mimetype,
                buffer: file.buffer
            }))

            const data: attachtFileDTO = {
                materialId: Number(req.params.id),
                files
            }

            await this.materialService.attachtFile(data, userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // through the id in the parameters get all information of a specific material
    async getMaterial(req: Request, res: Response){
        const { id } = req.params
        try {
            const material = await this.materialService.getMaterialById(Number(id))
            return res.status(200).send({ response: material })
        } catch (e) {
            return res.status(404).send({ response: "Material not found!" })
        }
    }

    // PUT
    // updates one or more fields for a specific material. The authenticated userid its from the request,
    // while the id provided in params identifies the material whose page is being updateda and
    // data from body is passed to substitute the old data
    async update(req: Request, res: Response){
        try {
            const { id } = req.params
            const userId = req.user.userId

            const files = (req.files as Express.Multer.File[]).map(file => ({
                originalName: file.originalname,
                mimeType: file.mimetype,
                buffer: file.buffer
            }))

            const data: updateMaterialDTO = {
                name: req.body.name,
                disciplineId: Number(req.body.disciplineId),
                classId: Number(req.body.classId),
                files
            }

            await this.materialService.updateMaterial(Number(id), data, userId)
            return res.status(200).send({ response: "Success!"})
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
            await this.materialService.deleteMaterial(Number(id), userId)
            return res.status(200).send({ response: "Success!"})
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }

    // GET
    // gets one attachment in material to download
    async download(req: Request, res: Response){
        const { id, materialAttachmentId } = req.params
        try {
            const file = await this.materialService.downloadMaterial(Number(id), Number(materialAttachmentId))
            res.setHeader("Content-Type", file.mimeType);
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="${file.fileName}"`
            );

            file.stream.pipe(res);
        } catch (e) {
            if (e instanceof Error)
                return res.status(500).json({ message: e.message });

            console.log(e)
            return res.status(500).json({ message: "Unknown error" });
        }
    }
}