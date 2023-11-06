import { Schema, SchemaFactory, Prop} from '@nestjs/mongoose';

@Schema({timestamps:true, collection: 'Posts'})
export class Posts {
    @Prop({required:true, trim:true})
    title:string
    @Prop({required:true, trim:true})
    description:string
    @Prop({required:true, trim:true})
    createdBy:string
}

export const PostsSchema = SchemaFactory.createForClass(Posts);