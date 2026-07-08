import { UploadedFile } from "#application/dtos/attachmentDTO.js";
import { IAttachmentService } from "#application/services/Attachment/IAttachment.service.js";
import { GridFSBucket } from "mongodb";

export class AttachmentService implements IAttachmentService{
    constructor(private bucket: GridFSBucket) {}

    async upload(file: UploadedFile): Promise<string> {

        const uploadStream = this.bucket.openUploadStream(file.originalName);

        uploadStream.end(file.buffer);

        await new Promise((resolve, reject) => {
            uploadStream.on("finish", resolve);
            uploadStream.on("error", reject);
        });

        return uploadStream.id.toString();
    }
}