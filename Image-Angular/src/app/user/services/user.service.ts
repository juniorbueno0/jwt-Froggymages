import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, bUser, tokenData, loginUser } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
    private dataKey:string = 'turtle-secret-password'
    private apiUrl: string = 'http://localhost:3002/users';
    public actualUser: tokenData = {name:'', token:''};
    
    constructor(private http: HttpClient) { }
    
    // POST /users
    createUsers(newUser:bUser): Observable<any>{
        console.log(`${this.apiUrl}`, newUser);
        return this.http.post(this.apiUrl, newUser);
    }

    // POST /users/login
    logInUsers(userData: loginUser): Observable<any>{
        console.log(`${this.apiUrl}/login`, userData);
        return this.http.post(`${this.apiUrl}/login`, userData);
    }

    // GET
    findAllUsers() : Observable<any>{
        const headers = new HttpHeaders({ Authorization: this.actualUser.token });
        return this.http.get(this.apiUrl, { headers });
    }

    // store token and name
    storeLogInData(user: tokenData): void{
        // local storage 
        localStorage.setItem(this.dataKey, user.name);
        // return user.name;
        console.log('storeData: ', user);
        this.actualUser = user;
    }

    getSecreKey(): string{
        return this.dataKey;
    }
    
    // logout
    logOutUser(){
        console.log('logout');
        localStorage.removeItem(this.dataKey);
    }
}