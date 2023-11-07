import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { tokenData, tokenDataResponse, userData, userLogin } from './interface/users.interface';

@Injectable()
export class UsersService {
    private SECRET:string = 'my-secret-turtle-key';
    loggedUserData:tokenData[] = [];
    sessionUserData:userData[] = [];

    constructor(@InjectModel(Users.name) private userModel: Model<Users>, private jwtServ:JwtService){ }

    async findAll(): Promise<Users[]>{
        const users: Users[] = await this.userModel.find();

        // validate token 
        return users;
    }

    // GET
    // refresh user data
    userData(){
        let data = this.sessionUserData;
        return data;
    }

    // POST
    // CREATE
    // /users
    async create(newUser: Users){
        const saltOrRounds = 10;
        const password = newUser.password;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        // 
        let user = {
            name: newUser.name,
            email: newUser.email,
            password: hashedPassword
        }
        // 
        let finalUser = this.userModel.create(user);
        console.log(finalUser);
        return await finalUser;
    }

    // LOGIN
    // /users/login
    async login(user: userLogin){
        let userList = this.findAll();

        const findUser = await userList.then(async (users) => {
            for(let i=0; i<users.length; i++){
                if(users[i].name===user.name){
                    return  users[i];
                }
            }
        })

        // validate, compare hashed password
        // console.log(findUser)
        if(findUser){
            console.log('//');
            const isMatch = bcrypt.compare( user.password, findUser.password).then( async (msg: boolean)=>{
                return msg;
            });
            
            if(isMatch){
                let jwt = this.createPayload(findUser.email, this.SECRET, findUser.name);
                return jwt;
            }else {
                return false;
            }
        } else {
            return false;
        }
    }

    // ******CREATE TOKEN******
    createPayload(email: string, secret:string, name:string){

        let data = { email: email };
        let jwt = this.jwtServ.sign(data, {secret});

        // if the user alredy has a token the old one is deleted
        for(let i=0; i<this.loggedUserData.length; i++){
            if(this.loggedUserData[i].email === email){
                this.loggedUserData.splice(i, 1);
            }
        }

        for(let i=0; i<this.sessionUserData.length; i++){
            if(this.sessionUserData[i].email === email){
                this.sessionUserData.splice(i, 1);
            }
        }

        let loginData = {
            email: email,
            token:jwt
        };  

        let userData = {
            name: name,
            email:email,
            token: jwt
        }

        //  saving the token/email, type={email:string, token:string}
        this.loggedUserData.push(loginData);
        this.sessionUserData.push(userData);

        console.log(loginData);

        let res: tokenDataResponse = {
            name:name,
            token:jwt 
        }
        // return {expiresIn:2000 , token:jwt};
        return res;
    }

}