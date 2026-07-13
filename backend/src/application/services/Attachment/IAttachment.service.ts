import { DownloadedFile, UploadedFile } from "#application/dtos/attachmentDTO.js";

export interface IAttachmentService {
    upload(file: UploadedFile): Promise<string>
    download(id: string): Promise<DownloadedFile>
}