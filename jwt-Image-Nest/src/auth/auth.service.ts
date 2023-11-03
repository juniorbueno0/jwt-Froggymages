import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
    constructor(private jwtServ: JwtService){}
    tokens:string[] = [];

    login(user: Auth){

        

        let payload = this.createPayload(user);
        return payload;
    }

    createPayload(user: Auth){
        let data = {
            name: user.name
        };

        let secret = 'my-secret-turtle-key';
        let jwt = this.jwtServ.sign(data, {secret});
        return {expiresIn:2000 , token:jwt};
    }
}
