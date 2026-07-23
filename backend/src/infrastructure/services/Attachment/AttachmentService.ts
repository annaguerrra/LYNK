import { DownloadedFile, UploadedFile } from "#application/dtos/attachmentDTO.js";
import { IAttachmentService } from "#application/services/Attachment/IAttachment.service.js";
import { getBucket } from "#infrastructure/database/database.js";
import { ObjectId } from "mongodb";

export class AttachmentService implements IAttachmentService{

    async upload(file: UploadedFile): Promise<string> {
        // variable used to build file at mongodb
        const bucket = getBucket()
        const uploadStream = bucket.openUploadStream(
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
        const bucket = getBucket()
        const objectId = new ObjectId(id)
        
        // search file at mongodb
        const file = await bucket.find({
            _id: objectId
        }).next()
        
        if (!file) {
            throw new Error("File not found")
        }
        
        // returns data to be downloaded
        return {
            stream: bucket.openDownloadStream(objectId),
            fileName: file.filename,
            mimeType: file.metadata?.mimeType
        } 
    }
    
    async delete(id: string): Promise<void> {
        // converts string to objectId and deletes correspondent file at mongo
        const bucket = getBucket()
        await bucket.delete(new ObjectId(id))
    }
}