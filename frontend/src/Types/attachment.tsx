import type { Buffer } from "buffer";

// File uploaded by the user
export type UploadedFileDTO = File;



// Attachment returned by the API
export interface MaterialAttachmentDTO {
    id: number;
}

export interface UploadedFile {
  originalName: string;
  mimeType: string;
  buffer: Buffer;
}
