import { viewContentDTO } from "#application/dtos/classDTO.js";
import { IPdfService } from "#application/services/Pdf/IPdf.service.js";
import { marked } from "marked";
import puppeteer from "puppeteer";

export class PdfService implements IPdfService{
    async mdToHtml(markdown: string): Promise<string> {
        // markdown settings
        marked.use({
            gfm: true,
            breaks: true,
            pedantic: false,
            async: true,
            silent: false,
        });

        // transforms the tokens into html
        const htmlFrag = await marked.parse(markdown);

        return htmlFrag;
    }
    async buildHtmlTemplate(htmlFragment: string, markdownInfo: viewContentDTO): Promise<string> {
        return `
            <!DOCTYPE html>
                <html lang="pt-BR">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">

                    <title>${markdownInfo.name}</title>

                    <style>
                    </style>

                </head>
                <body>
                    ${htmlFragment}
                </body>
                </html>
        `;
    }

    async htmlToPdf(hmtlStructured: string, markdownInfo: viewContentDTO): Promise<Buffer> {
        // initialize the browser
        const browser = await puppeteer.launch();
        try {
            const page = await browser.newPage();

            await page.setContent(hmtlStructured, {
                waitUntil: 'load' // resolves when the main html and all resources have fully downloaded
            });

            // generate the pdf
            const pdf = await page.pdf({
                path: `${markdownInfo.name}.pdf`,
                format: "A4",
                printBackground: true,
                // displayHeaderFooter:
            });

            return Buffer.from(pdf);
        }
        
        finally{
            await browser.close();
        }

    }

    async generatePdf(markdownInfo: viewContentDTO): Promise<Buffer> {
        const htmlFrag = await this.mdToHtml(markdownInfo.content);

        const hmtlStructured = await this.buildHtmlTemplate( 
            htmlFrag,
            markdownInfo);

        return await this.htmlToPdf(hmtlStructured, markdownInfo);
    }

}