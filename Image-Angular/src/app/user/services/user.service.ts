import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User, bUser, tokenData, loginUser } from '../interfaces/user.interface';
import { Observable, map } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Injectable({providedIn: 'root'})
export class UserService {
    private dataKey:string = 'turtle-secret-password'
    private apiUrl: string = 'http://localhost:3002/users';
    public actualUserName:string = '';
    public actualUserToken:string = '';
    public actualUserData: tokenData = {name:'', token:''};

    public userData:EventEmitter<tokenData> = new EventEmitter<tokenData>();
    
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
        let headers = new HttpHeaders({ Authorization: this.actualUserData.token });
        return this.http.get(this.apiUrl, { headers });
    }

    // store token and name
    storeLogInData(user: tokenData): void{
        localStorage.setItem(this.dataKey, user.token);
        
        this.actualUserData = {
            name: user.name,
            token: user.token
        }

        this.actualUserName = user.name;
        this.actualUserToken = user.token;
    }

    getSecreKey(): string{
        return this.dataKey;
    }

    //  retrieve the data of the actual user
    // getUserData(): Observable<any>{
    //     let headers = new HttpHeaders({ Authorization: this.actualUserToken });
    //     console.log(this.actualUserToken);
    //     return this.http.get(this.apiUrl, { headers });
    // }

    getData(token: string): Observable<any>{
        console.log(token);
        let headers = new HttpHeaders({ Authorization: token });
        return this.http.get(this.apiUrl, {headers});
    }
    
    // logout
    logOutUser(){
        console.log('logout');
        localStorage.removeItem(this.dataKey);
    }
}