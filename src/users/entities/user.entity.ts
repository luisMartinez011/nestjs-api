import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/auth/models/role.enum';

export type UserDocument = User & Document;

@Schema({ versionKey: false })
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);