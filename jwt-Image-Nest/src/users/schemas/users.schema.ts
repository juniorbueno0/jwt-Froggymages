import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";

@Schema({
    timestamps:true,
    collection:'Users'
})
export class Users {
    @Prop({required:true,unique:true,trim:true})
    name:string
    @Prop({required:true,unique:true,trim:true})
    email:string
    @Prop({required:true,trim:true})
    password:string
}

export const UserSchema = SchemaFactory.createForClass(Users)