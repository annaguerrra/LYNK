import { Readable } from "node:stream";

export interface UploadedFile {
  originalName: string;
  mimeType: string;
  buffer: Buffer;
}

export interface DownloadedFile {
    stream: Readable;
    fileName: string;
    mimeType?: string;
}