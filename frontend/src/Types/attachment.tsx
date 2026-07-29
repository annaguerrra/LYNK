import { Readable } from "node:stream";

// used to create a new file
export interface UploadedFile {
  originalName: string;
  mimeType: string;
  buffer: Buffer;
}

// used to download a file
export interface DownloadedFile {
    stream: Readable;
    fileName: string;
    mimeType?: string;
}