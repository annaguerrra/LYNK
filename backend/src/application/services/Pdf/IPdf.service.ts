import { viewContentDTO } from "#application/dtos/classDTO.js"

export interface IPdfService{
    //post
    mdToHtml(markdown: string): Promise<string>
    buildHtmlTemplate(htmlFragment: string, markdownInfo: viewContentDTO): Promise<string>
    htmlToPdf(hmtlStructured: string, markdownInfo: viewContentDTO): Promise<Buffer>
    generatePdf(markdownInfo: viewContentDTO): Promise<Buffer>
}