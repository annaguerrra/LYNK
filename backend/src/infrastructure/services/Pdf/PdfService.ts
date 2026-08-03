import { viewContentDTO } from "#application/dtos/classDTO.js";
import { IPdfService } from "#application/services/Pdf/IPdf.service.js";
import { marked, Tokens } from "marked";
import { serialize } from "node:v8";
import PDFDocument, { lineTo } from 'pdfkit'

export class PdfService implements IPdfService{

    private getContentWidth(doc: PDFKit.PDFDocument): number {
        return doc.page.width - doc.page.margins.left - doc.page.margins.right;
    }

    private ensureSpace(doc: PDFKit.PDFDocument, neededHeight: number): void {
        const bottomLimit = doc.page.height - doc.page.margins.bottom;

        if (doc.y + neededHeight > bottomLimit) {
            doc.addPage();
            this.renderHeader(doc);
        }
    }
    private renderHeader(doc: PDFKit.PDFDocument): void {
        const pageWidth = doc.page.width;

        // draws the header and paints it 
        doc 
            .rect(0, 0, pageWidth, 8)
            .fill("#E20015");

        // BOSCH logo and slogan
        doc
            .fill("#111111")
            .font("Helvetica-Bold")
            .fontSize(18)
            .text("BOSCH", 50, 26);
        
        doc
            .fillColor("#333333")
            .font("Helvetica")
            .fontSize(7)
            .text("Tecnologia para a vida", 50, 46);

        // draws a divider line
        doc
            .moveTo(50, 70)
            .lineTo(pageWidth - 50, 70)
            .strokeColor("#dddddd")
            .stroke();
        
        // moves down the cursor next to the content, so it wont be too close to the header 
        doc.y = 95;
    }
    
    // each method below will create and render a md structre
    private renderTitle(doc: PDFKit.PDFDocument, title: string): void {
        doc
            .fillColor("#111111")
            .font("Helvetica-Bold")
            .fontSize(24)
            .text(title, {
                align: "left"
            });
        
        doc.moveDown(1.5);
    }

    // During the the md conversion, if a quote is identified this method will be called, and the styles below will be applied
    private renderBlockquote(doc: PDFKit.PDFDocument, text: string) : void {
        doc
            .fillColor("#555555")
            .font("Helvetica-Oblique")
            .fontSize(11)
            .text(text, {
                indent: 18,
                lineGap: 4
            });
        
        doc.moveDown(0.8);
    }

    // During the the md conversion, if a code block is identified this method will be called, and the style below will be applied
    private renderCode(doc: PDFKit.PDFDocument, code: string): void {
        const startX = doc.page.margins.left;
        const width = this.getContentWidth(doc);

        doc
            .font("Courier")
            .fontSize(9);

        const codeHeight = doc.heightOfString(code, {
            width: width - 24,
            lineGap: 3
        });

        const boxHeight = codeHeight + 24;

        this.ensureSpace(doc, boxHeight + 20);

        const startY = doc.y;

        doc
            .roundedRect(startX, startY, width, boxHeight, 6)
            .fill("#0D1728");

        doc
            .fillColor("#D6F5D6")
            .font("Courier")
            .fontSize(9)
            .text(code, startX + 12, startY + 12, {
                width: width - 24,
                lineGap: 3
            });

        doc.y = startY + boxHeight + 18;
    }
    private async loadImageBuffer(src: string): Promise<Buffer> {
        // Image as base64/data URL
        if (src.startsWith("data:image")) {
            const base64 = src.split(",")[1];

            if (!base64) {
                throw new Error("Invalid base64 image.");
            }

            return Buffer.from(base64, "base64");
        }

        // Image from URL
        if (src.startsWith("http://") || src.startsWith("https://")) {
            const response = await fetch(src);

            if (!response.ok) {
                throw new Error(`Could not load image: ${src}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            return Buffer.from(arrayBuffer);
        }

        // Local path or relative path
        return Buffer.from(src);
    }

    private async renderImage( doc: PDFKit.PDFDocument, src: string, alt?: string): Promise<void> {
        try {
            const imageBuffer = await this.loadImageBuffer(src);

            const width = this.getContentWidth(doc);
            const maxImageHeight = 320;

            this.ensureSpace(doc, maxImageHeight + 40);

            const startY = doc.y;

            doc.image(imageBuffer, doc.page.margins.left, startY, {
                fit: [width, maxImageHeight],
                align: "center"
            });

            doc.y = startY + maxImageHeight + 10;

            if (alt) {
                doc
                    .fillColor("#666666")
                    .font("Helvetica-Oblique")
                    .fontSize(8)
                    .text(alt, {
                        align: "center"
                    });

                doc.moveDown(0.8);
            } else {
                doc.moveDown(0.8);
            }

        } catch (error) {
            doc
                .fillColor("#B00020")
                .font("Helvetica-Oblique")
                .fontSize(9)
                .text(`[Imagem não carregada: ${src}]`);

            doc.moveDown(0.8);
        }
    }

    // During the the md conversion, if a list is identified this method will be called, and the style below will be applied
    private renderList( doc: PDFKit.PDFDocument, items: Tokens.ListItem[]) : void {
        for( const item of items){ 
            doc
                .fillColor("#222222")
                .font("Helvetica")
                .fontSize(11)
                .text(`• ${item.text}`, { // creates the bullets
                    indent: 16,
                    lineGap: 3,
                    width: this.getContentWidth(doc) - 16
                });

            doc.moveDown(0.3) // line break
        }

        doc.moveDown(0.5);
    }

    // During the the md conversion, if a paragraph is identified this method will be called, and the style below will be applied
    private renderParagraph( doc: PDFKit.PDFDocument, text: string) : void {

        this.ensureSpace(doc, 40);

        doc
            .fillColor("#222222")
            .font("Helvetica")
            .fontSize(11)
            .text(text, {
                align: "left",
                lineGap: 4,
                width: this.getContentWidth(doc)
            });

        doc.moveDown(0.8);
    }

    // During the the md conversion, if a heading is identified this method will be called, and the style below will be applied
    private renderHeading(  doc: PDFKit.PDFDocument, text: string, depth: number) : void {
        // depth represents the title level
        const fontSize = depth === 1 ? 20 : depth == 2 ? 17 : 14

        this.ensureSpace(doc, fontSize + 35);
        doc.moveDown(0.6);

        doc
            .fillColor("#111111")
            .font("Helvetica-Bold")
            .fontSize(fontSize)
            .text(text, {
                lineGap: 2
            });
            
            if( depth === 1) {
                doc
                    .moveTo(doc.page.margins.left, doc.y + 4)
                    .lineTo(doc.page.width - doc.page.margins.right, doc.y + 4)
                    .strokeColor("#E20015")
                    .lineWidth(1)
                    .stroke();
                
                    doc.moveDown(0.8);
            } else {
                doc.moveDown(0.4);
            }

    }

    private async renderInlineTokens( doc: PDFKit.PDFDocument, tokens: Tokens.Generic[] ): Promise<void> {
        for (const token of tokens) {
            if (token.type === "text") {
                const textToken = token as Tokens.Text;
                this.renderParagraph(doc, textToken.text);
            }

            else if (token.type === "image") {
                const imageToken = token as Tokens.Image;
                await this.renderImage(doc, imageToken.href, imageToken.text);
            }

            else if (token.type === "link") {
                const linkToken = token as Tokens.Link;

                doc
                    .fillColor("#005691")
                    .font("Helvetica")
                    .fontSize(11)
                    .text(linkToken.text || linkToken.href, {
                        link: linkToken.href,
                        underline: true,
                        lineGap: 4
                    });

                doc.moveDown(0.6);
            }

            else if (token.type === "codespan") {
                const codeToken = token as Tokens.Codespan;

                doc
                    .fillColor("#222222")
                    .font("Courier")
                    .fontSize(10)
                    .text(codeToken.text, {
                        lineGap: 4
                    });

                doc.moveDown(0.4);
            }
        }
    }

    // token represents a single unit of a structured md object. This method identifies the object and renders it.
    private async renderToken(doc: PDFKit.PDFDocument, token: Tokens.Generic): Promise<void> {
        switch(token.type) {
            case "heading": {
                const heading = token as Tokens.Heading;
                this.renderHeading(doc, heading.text, heading.depth);
                break;
            }

            case "paragraph": {
                const paragraph = token as Tokens.Paragraph;

                if (paragraph.tokens && paragraph.tokens.length > 0) {
                    await this.renderInlineTokens(doc, paragraph.tokens as Tokens.Generic[]);
                } else {
                    this.renderParagraph(doc, paragraph.text);
                }

                break;
            }

            case "list": {
                const list = token as Tokens.List;
                this.renderList(doc, list.items);
                break;
            }

            case "code": {
                const code = token as Tokens.Code;
                this.renderCode(doc, code.text);
                break;
            }

            case "blockquote": {
                const quote = token as Tokens.Blockquote;
                this.renderBlockquote(doc, quote.text);
                break;
            }

            case "image": {
                const image = token as Tokens.Image;
                await this.renderImage(doc, image.href, image.text);
                break;
            }

            case "space": {
                doc.moveDown(0.5);
                break;
            }

            default: {
                break;
            }
        }
    }

    // reads the md and transforms the token, which is the identified structure of the md
    private async renderMarkdown(doc: PDFKit.PDFDocument, markdown: string): Promise<void> {
        const tokens = marked.lexer(markdown);

        for(const token of tokens){
            this.renderToken(doc, token);
        }
    }

    // compiles all the md structures and converts into a pdf document
    async generatePdf(markdownInfo: viewContentDTO): Promise<Buffer> {
        
        return new Promise((resolve, reject) =>{
            const doc = new PDFDocument({
                size: "A4",
                margin: 50
            });

            // parts of the pdf are generated and storaged here
            const chunks: Buffer[] = [];
            
            // it's like an append on the parts
            doc.on("data", (chunk) => {
                chunks.push(chunk);
            });
            
            // returns a single buffer with all the parts of the pdf together
            doc.on("end", () => {
                resolve(Buffer.concat(chunks))
            });

            doc.on("error", (error) => {
                reject(error);
            });
            
            async function buildPdf(service: PdfService) {
                try {
                    service.renderHeader(doc)
                    service.renderTitle(doc, markdownInfo.name);
                    await service.renderMarkdown(doc, markdownInfo.content);

                    doc.end();
                } catch(error) {
                    reject(error);
                }
            }

            buildPdf(this);

            doc.end();
        });

    }

}