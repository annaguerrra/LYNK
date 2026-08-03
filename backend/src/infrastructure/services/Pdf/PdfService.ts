import { viewContentDTO } from "#application/dtos/classDTO.js";
import { IPdfService } from "#application/services/Pdf/IPdf.service.js";
import { marked, Tokens } from "marked";
import sharp from "sharp";
import PDFDocument from "pdfkit";

export class PdfService implements IPdfService {

    private getContentWidth(doc: PDFKit.PDFDocument): number {
        return doc.page.width - doc.page.margins.left - doc.page.margins.right;
    }

    private getBottomLimit(doc: PDFKit.PDFDocument): number {
        return doc.page.height - doc.page.margins.bottom;
    }

    private ensureSpace(doc: PDFKit.PDFDocument, neededHeight: number): void {
        const bottomLimit = this.getBottomLimit(doc);

        if (doc.y + neededHeight > bottomLimit) {
            doc.addPage();
            this.renderHeader(doc);
        }
    }

    private decodeHtml(value: string): string {
        return value
            .replace(/&amp;/g, "&")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&apos;/g, "'")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">");
    }

    private cleanText(text: string): string {
        return this.decodeHtml(text)
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/<\/?strong>/gi, "")
            .replace(/<\/?b>/gi, "")
            .replace(/<\/?em>/gi, "")
            .replace(/<\/?i>/gi, "")
            .trim();
    }

    /**
     * Converts HTML images into Markdown images before marked.lexer().
     * This prevents <img> from being split into normal text tokens.
     */
    private normalizeImages(markdown: string): string {
        const decodedMarkdown = this.decodeHtml(markdown);

        return decodedMarkdown.replace(
            /<img\b[^>]*src\s*=\s*["']([^"']+)["'][^>]*>/gi,
            (_match, src) => {
                const cleanSrc = this.decodeHtml(String(src)).trim();

                return `\n\n![](${cleanSrc})\n\n`;
            }
        );
    }

    private extractImageFromHtml(html: string): { src: string; alt?: string } | null {
        const srcMatch = html.match(/src\s*=\s*["']([^"']+)["']/i);
        const altMatch = html.match(/alt\s*=\s*["']([^"']*)["']/i);

        if (!srcMatch) {
            return null;
        }

        return {
            src: this.decodeHtml(srcMatch[1].trim()),
            alt: altMatch?.[1] ? this.decodeHtml(altMatch[1].trim()) : undefined
        };
    }

    private renderHeader(doc: PDFKit.PDFDocument): void {
        const pageWidth = doc.page.width;

        doc
            .rect(0, 0, pageWidth, 8)
            .fill("#E20015");

        doc
            .fillColor("#111111")
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
            .strokeColor("#dddddd")
            .lineWidth(1)
            .stroke();

        doc.y = 95;
    }

    private renderTitle(doc: PDFKit.PDFDocument, title: string): void {
        this.ensureSpace(doc, 60);

        doc
            .fillColor("#111111")
            .font("Helvetica-Bold")
            .fontSize(24)
            .text(this.cleanText(title), {
                align: "left",
                width: this.getContentWidth(doc)
            });

        doc.moveDown(1.2);
    }

    private renderHeading(doc: PDFKit.PDFDocument, text: string, depth: number): void {
        const fontSize = depth === 1 ? 20 : depth === 2 ? 17 : 14;

        this.ensureSpace(doc, fontSize + 40);

        doc.moveDown(0.5);

        doc
            .fillColor("#111111")
            .font("Helvetica-Bold")
            .fontSize(fontSize)
            .text(this.cleanText(text), {
                width: this.getContentWidth(doc),
                lineGap: 2
            });

        if (depth === 1) {
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

    private renderParagraph(doc: PDFKit.PDFDocument, text: string): void {
        const cleanText = this.cleanText(text);

        if (!cleanText) {
            return;
        }

        this.ensureSpace(doc, 35);

        doc
            .fillColor("#222222")
            .font("Helvetica")
            .fontSize(11)
            .text(cleanText, {
                align: "left",
                lineGap: 4,
                width: this.getContentWidth(doc)
            });

        doc.moveDown(0.8);
    }

    private renderBlockquote(doc: PDFKit.PDFDocument, text: string): void {
        const cleanText = this.cleanText(text);

        if (!cleanText) {
            return;
        }

        this.ensureSpace(doc, 50);

        const startX = doc.page.margins.left;
        const startY = doc.y;
        const width = this.getContentWidth(doc);

        const quoteHeight = doc.heightOfString(cleanText, {
            width: width - 30,
            lineGap: 4
        });

        doc
            .rect(startX, startY, 4, quoteHeight + 12)
            .fill("#E20015");

        doc
            .fillColor("#555555")
            .font("Helvetica-Oblique")
            .fontSize(11)
            .text(cleanText, startX + 16, startY + 4, {
                width: width - 30,
                lineGap: 4
            });

        doc.y = startY + quoteHeight + 18;
    }

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

    private renderList(doc: PDFKit.PDFDocument, items: Tokens.ListItem[]): void {
        for (const item of items) {
            const cleanText = this.cleanText(item.text);

            if (!cleanText) {
                continue;
            }

            this.ensureSpace(doc, 30);

            doc
                .fillColor("#222222")
                .font("Helvetica")
                .fontSize(11)
                .text(`• ${cleanText}`, {
                    indent: 16,
                    lineGap: 3,
                    width: this.getContentWidth(doc) - 16
                });

            doc.moveDown(0.3);
        }

        doc.moveDown(0.5);
    }

    private async loadImageBuffer(src: string): Promise<Buffer> {
        let imageBuffer: Buffer;

        if (src.startsWith("data:image")) {
            const base64 = src.split(",")[1];

            if (!base64) {
                throw new Error("Invalid base64 image.");
            }

            imageBuffer = Buffer.from(base64, "base64");
        }

        else if (src.startsWith("http://") || src.startsWith("https://")) {
            const response = await fetch(src, {
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
                }
            });

            if (!response.ok) {
                throw new Error(`Could not load image: ${response.status} ${response.statusText} - ${src}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            imageBuffer = Buffer.from(arrayBuffer);
        }

        else if (src.startsWith("blob:")) {
            throw new Error("Blob images cannot be rendered in backend PDF.");
        }

        else {
            throw new Error(`Unsupported image source: ${src}`);
        }

        return await sharp(imageBuffer)
            .png()
            .toBuffer();
    }

    private async renderImage(
        doc: PDFKit.PDFDocument,
        src: string,
        alt?: string
    ): Promise<void> {
        try {
            const cleanSrc = this.decodeHtml(src).trim();
            const imageBuffer = await this.loadImageBuffer(cleanSrc);

            const width = this.getContentWidth(doc);
            const maxImageHeight = 320;

            this.ensureSpace(doc, maxImageHeight + 45);

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
                    .text(this.cleanText(alt), {
                        align: "center",
                        width: this.getContentWidth(doc)
                    });

                doc.moveDown(0.8);
            } else {
                doc.moveDown(0.8);
            }

        } catch (error) {
            console.error("Erro ao renderizar imagem no PDF:", {
                src,
                error
            });

            doc
                .fillColor("#B00020")
                .font("Helvetica-Oblique")
                .fontSize(9)
                .text(`[Imagem não carregada: ${src}]`, {
                    width: this.getContentWidth(doc)
                });

            doc.moveDown(0.8);
        }
    }

    private async renderInlineTokens(
        doc: PDFKit.PDFDocument,
        tokens: Tokens.Generic[]
    ): Promise<void> {
        for (const token of tokens) {
            if (token.type === "text") {
                const textToken = token as Tokens.Text;
                const image = this.extractImageFromHtml(textToken.text);

                if (image) {
                    await this.renderImage(doc, image.src, image.alt);
                } else {
                    this.renderParagraph(doc, textToken.text);
                }
            }

            else if (token.type === "image") {
                const imageToken = token as Tokens.Image;
                await this.renderImage(doc, imageToken.href, imageToken.text);
            }

            else if (token.type === "html") {
                const htmlToken = token as Tokens.HTML;
                const image = this.extractImageFromHtml(htmlToken.text);

                if (image) {
                    await this.renderImage(doc, image.src, image.alt);
                } else {
                    this.renderParagraph(doc, htmlToken.text);
                }
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
                        lineGap: 4,
                        width: this.getContentWidth(doc)
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
                        lineGap: 4,
                        width: this.getContentWidth(doc)
                    });

                doc.moveDown(0.4);
            }
        }
    }

    private async renderToken(
        doc: PDFKit.PDFDocument,
        token: Tokens.Generic
    ): Promise<void> {
        switch (token.type) {
            case "heading": {
                const heading = token as Tokens.Heading;
                this.renderHeading(doc, heading.text, heading.depth);
                break;
            }

            case "paragraph": {
                const paragraph = token as Tokens.Paragraph;
                const image = this.extractImageFromHtml(paragraph.text);

                if (image) {
                    await this.renderImage(doc, image.src, image.alt);
                }

                else if (paragraph.tokens && paragraph.tokens.length > 0) {
                    await this.renderInlineTokens(doc, paragraph.tokens as Tokens.Generic[]);
                }

                else {
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

            case "html": {
                const htmlToken = token as Tokens.HTML;
                const image = this.extractImageFromHtml(htmlToken.text);

                if (image) {
                    await this.renderImage(doc, image.src, image.alt);
                } else {
                    this.renderParagraph(doc, htmlToken.text);
                }

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

    private async renderMarkdown(
        doc: PDFKit.PDFDocument,
        markdown: string
    ): Promise<void> {
        const normalizedMarkdown = this.normalizeImages(markdown);

        const tokens = marked.lexer(normalizedMarkdown);

        for (const token of tokens) {
            await this.renderToken(doc, token);
        }
    }

    async generatePdf(markdownInfo: viewContentDTO): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({
                size: "A4",
                margin: 50
            });

            const chunks: Buffer[] = [];

            doc.on("data", (chunk) => {
                chunks.push(chunk);
            });

            doc.on("end", () => {
                resolve(Buffer.concat(chunks));
            });

            doc.on("error", (error) => {
                reject(error);
            });

            const buildPdf = async () => {
                try {
                    this.renderHeader(doc);
                    this.renderTitle(doc, markdownInfo.name);
                    await this.renderMarkdown(doc, markdownInfo.content);

                    doc.end();
                } catch (error) {
                    reject(error);
                }
            };

            buildPdf();
        });
    }
}