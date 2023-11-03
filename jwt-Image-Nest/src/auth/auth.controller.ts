import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authServide:AuthService){}

    @Post()
    login(@Body() data: {name:string, password:string}){
        return this.authServide.login(data);
    }
}
