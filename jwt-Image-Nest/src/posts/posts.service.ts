import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Posts } from './schemas/posts.schema';
import { Model } from 'mongoose';
import { basePost } from './interfaces/post.interface';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Posts.name) private postModel: Model<Posts>){}
    // get all /posts
    async findAll(): Promise<Posts[]> {   
        let posts = await this.postModel.find();
        return posts;
    }

    async createPost(newPost: basePost): Promise<Posts>{
        let post = this.postModel.create(newPost);
        return await post;
    }
}