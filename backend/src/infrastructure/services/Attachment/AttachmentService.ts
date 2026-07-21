import { DownloadedFile, UploadedFile } from "#application/dtos/attachmentDTO.js";
import { IAttachmentService } from "#application/services/Attachment/IAttachment.service.js";
import { GridFSBucket, ObjectId } from "mongodb";

export class AttachmentService implements IAttachmentService{
    constructor(private bucket: GridFSBucket) {}

    async upload(file: UploadedFile): Promise<string> {
        
        // variable used to build file at mongodb
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
        
        // returns file id
        return uploadStream.id.toString();
    }
    
    async download(id: string): Promise<DownloadedFile> {
        // variable used to convert string to objectId for mongo
        const objectId = new ObjectId(id)
        
        // search file at mongodb
        const file = await this.bucket.find({
            _id: objectId
        }).next()
        
        if (!file) {
            throw new Error("File not found")
        }
        
        // returns data to be downloaded
        return {
            stream: this.bucket.openDownloadStream(objectId),
            fileName: file.filename,
            mimeType: file.metadata?.mimeType
        } 
    }
    
    async delete(id: string): Promise<void> {
        // converts string to objectId and deletes correspondent file at mongo
       await this.bucket.delete(new ObjectId(id))
    }
}