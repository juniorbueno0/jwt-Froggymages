import { Controller, Get, Post, Body, Req, Header, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './schemas/users.schema';
import { tokenData, userLogin } from './interface/users.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService){}
    
    // route protected
    @Get()
    findAll(@Request() req){
        // get the headers
        const loggedUserList: tokenData[] = this.userService.loggedUserData;
        const authorizationHeader = req.headers['authorization'];
        console.log(authorizationHeader);

        for(let i=0; i<loggedUserList.length; i++){
            if(loggedUserList[i].token = authorizationHeader){
                return this.userService.findAll();
            }
        }
        
        // if (!authorizationHeader) {
        //     return { message: 'Unauthorized' };
        // }
        // return this.userService.findAll();
    }

    @Post()
    createUser(@Body() newUser: Users){
        return this.userService.create(newUser);
    }

    @Post('/login')
    login(@Body() data: userLogin){
        return this.userService.login(data);
    }

}