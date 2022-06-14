import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Role } from 'src/auth/models/role.enum';
import { Product } from 'src/products/entities/product.entity';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    role: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] })
    products: Types.Array<Product>;

}

export const UserSchema = SchemaFactory.createForClass(User);