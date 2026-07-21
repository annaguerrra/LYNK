import { viewContentDTO } from "#application/dtos/classDTO.js";
import { IPdfService } from "#application/services/Pdf/IPdf.service.js";
import { marked, MarkedToken, Tokens } from "marked";
import doc from "pdfkit";
import PDFDocument from 'pdfkit'

export class PdfService implements IPdfService{
    
    private renderHeader(doc: PDFKit.PDFDocument): void {
        const pageWidth = doc.page.width;

        // draws the header and paints it 
        doc 
            .rect(0, 0, pageWidth, 8)
            .fill("#E20015");
        
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
        
        doc
            .moveTo(50, 70)
            .lineTo(pageWidth - 50, 70)
            .strokeColor("dddddd")
            .stroke();
        
        // moves down the cursor next to the content, so it wont be too close to the header 
        doc.y = 95;
    }
    
    private renderTitle(doc: PDFKit.PDFDocument, title: string): void {
        doc
            .fillColor("#111111")
            .font("Heveltica-Bold")
            .fontSize(24)
            .text(title, {
                align: "left"
            });
        
        doc.moveDown(1.5);
    }

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

    private renderCode(doc: PDFKit.PDFDocument, code: string): void {
        // actual cursor position
        const startX = doc.x
        const startY = doc.y

        // available width into the page
        const width = doc.page.width - 100

        // code block fixed height
        const height = 90

        // code block dark background
        doc
            .roundedRect(startX, startY, width, height, 6)
            .fill("0D1728");
        
        doc
            .fillColor("#D6F5D6")
            .font("Courier")
            .fontSize(9)
            .text(code, startX + 12, startY - 12, {
                width: width - 24,
                lineGap: 3
            });

        // moves the cursor past the code block
        doc.y = startY + height + 18;
    }

    private renderList( doc: PDFKit.PDFDocument, items: Tokens.ListItem[]) : void {
        for( const item of items){ 
            doc
                .fillColor("#222222")
                .font("Helvetica")
                .fontSize(11)
                .text(`• ${item.text}`, { // creates the bullets
                    indent: 16,
                    lineGap: 3
                });

            doc.moveDown(0.3) // line break
        }

        doc.moveDown(0.5);
    }

    private renderParagraph( doc: PDFKit.PDFDocument, text: string) : void {
        doc
            .fillColor("#222222")
            .font("Heveltica")
            .fontSize(11)
            .text(text, {
                align: "left",
                lineGap: 4
            });

        doc.moveDown(0.8);
    }

    private renderHeading(  doc: PDFKit.PDFDocument, text: string, depth: number) : void {
        // depth represents the title level
        const fontSize = depth === 1 ? 20 : depth == 2 ? 17 : 14

        doc
            .moveDown(0.8)
            .fillColor("#111111")
            .font("Heveltica-Bold")
            .fontSize(fontSize)
            .text(text)
        
            doc.moveDown(0.4);

    }

    private renderToken(doc: PDFKit.PDFDocument, token: Tokens.Generic) : void {
        switch(token.type) {
            case "heading": {
                const heading = token as Tokens.Heading;
                
                this.renderHeading(doc, heading.text, heading.depth);
                
                break;
            }
            case "paragraph": {
                const paragraph = token as Tokens.Paragraph;

                this.renderParagraph(doc, paragraph.text);

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
            case "blockquote":{
                const quote = token as Tokens.Blockquote;

                this.renderBlockquote(doc, quote.text);
                break;
            }
            case "space": {
                doc.moveDown(0.5);
            }

            default: {
                
            }
        }
                

    }

    private renderMarkdown(doc: PDFKit.PDFDocument, markdown: string): void {
        // reads the md and transforms the token, which is the identified section of the md
        const tokens = marked.lexer(markdown);

        for(const token of tokens){
            render
        }
    }


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

            doc.end();
        });

    }

}