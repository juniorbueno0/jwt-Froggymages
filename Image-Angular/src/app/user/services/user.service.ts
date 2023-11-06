import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, bUser, tokenData, loginUser } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UserService {
    private dataKey:string = 'turtle-secret-password'
    private apiUrl: string = 'http://localhost:3002/users';
    public actualUserName:string = '';
    public actualUserToken:string = '';
    
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
        const headers = new HttpHeaders({ Authorization: this.actualUserToken });
        return this.http.get(this.apiUrl, { headers });
    }

    // store token and name
    storeLogInData(user: tokenData): void{
        localStorage.setItem(this.dataKey, user.token);
        
        this.actualUserName = user.name;
        this.actualUserToken = user.token;

        console.log('storeData: ', user);
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