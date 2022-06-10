import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false })
export class Product {
    @Prop()
    name: string;

    @Prop()
    image: string

    @Prop()
    price: number;

    @Prop()
    description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);