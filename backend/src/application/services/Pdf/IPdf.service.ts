export interface IPdfService{
    //post
    mdToHtml(markdown: string): Promise<String>
    buildHtmlTemplate(htmlFragment: string): Promise<String>
    htmlToPdf(hmtlStructured: string): Promise<Buffer>
}