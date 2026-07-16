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
    async buildHtmlTemplate( htmlFragment: string, markdownInfo: viewContentDTO): Promise<string> {
    return `
                <!DOCTYPE html>
                <html lang="pt-BR">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">

                        <title>${markdownInfo.name}</title>

                        <style>
                            * {
                                box-sizing: border-box;
                            }

                            @page {
                                size: A4;
                                margin: 0;
                            }

                            body {
                                margin: 0;
                                padding: 0;
                                background: #eeeeee;
                                font-family: Arial, Helvetica, sans-serif;
                                color: #111111;
                            }

                            .page {
                                width: 100%;
                                min-height: 100vh;
                                background: #ffffff;
                            }

                            .top-color-bar {
                                height: 7px;
                                width: 100%;
                                background: linear-gradient(
                                    90deg,
                                    #e20015 0%,
                                    #e20015 23%,
                                    #742c8f 23%,
                                    #742c8f 35%,
                                    #173f8f 35%,
                                    #173f8f 53%,
                                    #008ecf 53%,
                                    #008ecf 58%,
                                    #00a6c8 58%,
                                    #00a6c8 75%,
                                    #009c5a 75%,
                                    #009c5a 86%,
                                    #007a3d 86%,
                                    #007a3d 100%
                                );
                            }

                            .header {
                                height: 54px;
                                padding: 0 32px;
                                border-bottom: 1px solid #e8e8e8;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                background: #ffffff;
                            }

                            .brand {
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            }

                            .brand-symbol {
                                width: 22px;
                                height: 22px;
                                border: 1.8px solid #111;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 11px;
                                font-weight: 700;
                                line-height: 1;
                            }

                            .brand-text {
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                            }

                            .brand-name {
                                color: #e20015;
                                font-weight: 800;
                                font-size: 20px;
                                letter-spacing: 0.2px;
                                line-height: 1;
                            }

                            .brand-subtitle {
                                color: #222;
                                font-size: 6.5px;
                                margin-top: 2px;
                                letter-spacing: 0.1px;
                            }

                            .user-area {
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                color: #111;
                                font-size: 9px;
                            }

                            .user-avatar {
                                width: 23px;
                                height: 23px;
                                border-radius: 50%;
                                background: #d9d9d9;
                                position: relative;
                            }

                            .user-avatar::before {
                                content: "";
                                position: absolute;
                                width: 8px;
                                height: 8px;
                                border-radius: 50%;
                                background: #ffffff;
                                left: 7.5px;
                                top: 4px;
                            }

                            .user-avatar::after {
                                content: "";
                                position: absolute;
                                width: 14px;
                                height: 8px;
                                border-radius: 10px 10px 0 0;
                                background: #ffffff;
                                left: 4.5px;
                                bottom: 3.5px;
                            }

                            .content {
                                padding: 34px 58px 56px 58px;
                            }

                            .back-symbol {
                                font-size: 28px;
                                line-height: 1;
                                margin-bottom: 26px;
                                color: #111;
                            }

                            .lesson-title {
                                margin: 0 0 28px 0;
                                font-size: 28px;
                                line-height: 1.2;
                                font-weight: 800;
                                color: #050505;
                            }

                            .markdown-content {
                                font-size: 15px;
                                line-height: 1.45;
                                color: #111;
                            }

                            .markdown-content h1 {
                                font-size: 28px;
                                line-height: 1.2;
                                margin: 0 0 28px 0;
                                font-weight: 800;
                            }

                            .markdown-content h2 {
                                font-size: 18px;
                                margin: 32px 0 10px 0;
                                font-weight: 700;
                            }

                            .markdown-content h3 {
                                font-size: 16px;
                                margin: 24px 0 8px 0;
                                font-weight: 700;
                            }

                            .markdown-content p {
                                margin: 0 0 16px 0;
                            }

                            .markdown-content ul,
                            .markdown-content ol {
                                margin: 8px 0 18px 24px;
                                padding: 0;
                            }

                            .markdown-content li {
                                margin: 4px 0;
                            }

                            .markdown-content strong {
                                font-weight: 700;
                            }

                            .markdown-content img {
                                max-width: 100%;
                                display: block;
                                margin: 26px auto;
                            }

                            .markdown-content code {
                                font-family: Consolas, Monaco, "Courier New", monospace;
                                font-size: 13px;
                                background: #f1f1f1;
                                border-radius: 4px;
                                padding: 2px 5px;
                            }

                            .markdown-content pre {
                                margin: 22px 0;
                                padding: 18px 20px;
                                border-radius: 8px;
                                background: #0d1728;
                                color: #d6f5d6;
                                overflow-x: auto;
                                font-size: 13px;
                                line-height: 1.5;
                            }

                            .markdown-content pre code {
                                background: transparent;
                                color: inherit;
                                padding: 0;
                            }

                            .markdown-content blockquote {
                                margin: 22px 0;
                                padding: 14px 18px;
                                border-left: 4px solid #005aa3;
                                background: #f4f8fb;
                                color: #333;
                            }

                            .markdown-content table {
                                width: 100%;
                                border-collapse: collapse;
                                margin: 24px 0;
                                font-size: 13px;
                            }

                            .markdown-content th,
                            .markdown-content td {
                                border: 1px solid #dddddd;
                                padding: 10px 12px;
                                text-align: left;
                            }

                            .markdown-content th {
                                background: #f1f1f1;
                                font-weight: 700;
                            }

                            @media print {
                                body {
                                    background: #ffffff;
                                }

                                .markdown-content pre,
                                .markdown-content img,
                                .markdown-content table {
                                    page-break-inside: avoid;
                                }
                            }
                        </style>
                    </head>

                    <body>
                        <div class="page">
                            <div class="top-color-bar"></div>

                            <header class="header">
                                <div class="brand">
                                    <div class="brand-symbol">H</div>

                                    <div class="brand-text">
                                        <div class="brand-name">BOSCH</div>
                                        <div class="brand-subtitle">Tecnologia para a vida</div>
                                    </div>
                                </div>

                                <div class="user-area">
                                    <div class="user-avatar"></div>
                                    <span>Turma_DTA_3</span>
                                </div>
                            </header>

                            <main class="content">
                                <div class="back-symbol">←</div>

                                <h1 class="lesson-title">${markdownInfo.name}</h1>

                                <section class="markdown-content">
                                    ${htmlFragment}
                                </section>
                            </main>
                        </div>
                    </body>
                </html>
            `;
        }

    async htmlToPdf( htmlStructured: string, markdownInfo: viewContentDTO
): Promise<Buffer> {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();

        await page.setContent(htmlStructured, {
            waitUntil: "load"
        });

        const pdf = await page.pdf({
            path: `${markdownInfo.name}.pdf`,
            format: "A4",
            printBackground: true,
            margin: {
                top: "0mm",
                right: "0mm",
                bottom: "0mm",
                left: "0mm"
            }
        });

        return Buffer.from(pdf);
    } finally {
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