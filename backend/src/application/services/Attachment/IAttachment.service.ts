import { UploadedFile } from "#application/dtos/attachmentDTO.js";

export interface IAttachmentService {
    upload(file: UploadedFile): Promise<string>
}