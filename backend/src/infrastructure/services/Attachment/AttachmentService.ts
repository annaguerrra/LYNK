import { DownloadedFile, UploadedFile } from "#application/dtos/attachmentDTO.js";
import { IAttachmentService } from "#application/services/Attachment/IAttachment.service.js";
import { GridFSBucket, ObjectId } from "mongodb";
import { Readable } from "node:stream";

export class AttachmentService implements IAttachmentService{
    constructor(private bucket: GridFSBucket) {}
    
    async upload(file: UploadedFile): Promise<string> {
        
        const uploadStream = this.bucket.openUploadStream(
            file.originalName,
            {
                metadata: {
                    mimeType: file.mimeType
                }
            }
        );
        
        uploadStream.end(file.buffer);
        
        await new Promise((resolve, reject) => {
            uploadStream.on("finish", resolve);
            uploadStream.on("error", reject);
        });
        
        return uploadStream.id.toString();
    }

    async dowload(id: string): Promise<DownloadedFile> {
        const objectId = new ObjectId(id)
           
        const file = await this.bucket.find({
            _id: objectId
        }).next()

        if (!file) {
            throw new Error("File not found")
        }

        return {
            stream: this.bucket.openDownloadStream(objectId),
            fileName: file.filename,
            mimeType: file.metadata?.mimeType
        } 
    }
}