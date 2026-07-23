import { viewContentDTO } from "#application/dtos/classDTO.js"

export interface IPdfService{
    //post
    generatePdf(markdownInfo: viewContentDTO): Promise<Buffer>
}