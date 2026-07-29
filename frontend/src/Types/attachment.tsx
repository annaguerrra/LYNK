// File uploaded by the user
export type UploadedFileDTO = File;

// Attachment returned by the API
export interface MaterialAttachmentDTO {
    id: number;
    fileName: string;
    mimeType: string;
}