import mongoose, { Document, Schema } from "mongoose";

interface IAttachement extends Document {
    name: string
    documentType: string
    createdAt: Date
    upadtedAt: Date
}

const attachementSchema: Schema = new Schema({
    name: { type: String, required: true },
    documentType: { type: String, required: true },
    createdAt: { type: Date, required: true },
    upadtedAt: { type: Date, required: true }
})

const Attachement = mongoose.model<IAttachement>('Attachement', attachementSchema, 'Attachement')

export default Attachement