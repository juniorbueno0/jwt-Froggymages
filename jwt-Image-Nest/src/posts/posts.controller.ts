import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { PostsService } from './posts.service';
import { basePost } from './interfaces/post.interface';
import { UsersService } from 'src/users/users.service';
import { tokenData } from 'src/users/interface/users.interface';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService:PostsService, private readonly userService:UsersService ){ }
    
    @Get()
    getAllPosts(@Request() req){
        // list of all users and tokens
        const loggedUserList2: tokenData[] = this.userService.loggedUserData;
        console.log('users: ',loggedUserList2);
        // get the 'authorization' from the headers
        const authorizationHeader = req.headers['authorization'];
        // // compare the tokens 
        for(let i=0; i<loggedUserList2.length; i++){
            if(loggedUserList2[i].token = authorizationHeader){
        //         // return the data if the user is logged
                return this.postService.findAll();
            }
        }

        // return this.postService.findAll();
    }

    @Post()
    createPost(@Body() newPost: basePost){
        return this.postService.createPost(newPost);
    }
}
