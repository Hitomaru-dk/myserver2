import mongoose, { Schema, Document } from 'mongoose';

// Interface สำหรับ Item
export interface IItem extends Document {
    name: string;
    description: string;
    price: number;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

// Schema สำหรับ Item
const ItemSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: '' },
        price: { type: Number, required: true },
        category: { type: String, default: 'general' },
    },
    {
        timestamps: true, // auto createdAt, updatedAt
    }
);

export const Item = mongoose.model<IItem>('Item', ItemSchema);
