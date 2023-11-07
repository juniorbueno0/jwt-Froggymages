import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';
import { basePost } from '../interfaces/post.interface';

@Injectable({providedIn: 'root'})
export class PostService {
    private apiUrl:string = 'http://localhost:3002/posts';
    
    constructor(private http:HttpClient, private userService:UserService) { }

    getAllPosts(localToken: string): Observable<any>{
        let headers: HttpHeaders | undefined;
        if (localToken) {
          headers = new HttpHeaders({ Authorization: localToken });
        }
    
        let posts = this.http.get(this.apiUrl, { headers });
        return posts;
    }

    createPost(newPost: basePost): Observable<any>{
        console.log(newPost);
        return this.http.post(this.apiUrl, newPost);
    }
    
}