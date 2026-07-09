import { DownloadedFile, UploadedFile } from "#application/dtos/attachmentDTO.js";

export interface IAttachmentService {
    upload(file: UploadedFile): Promise<string>
    dowload(id: string): Promise<DownloadedFile>
}