import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';
import { basePost } from '../interfaces/post.interface';

@Injectable({providedIn: 'root'})
export class PostService {
    private apiUrl:string = 'http://localhost:3002/posts';
    
    constructor(private http:HttpClient, private userService:UserService) { }

    getAllPosts(): Observable<any>{
        let key = this.userService.getSecreKey();
        let User = localStorage.getItem(key);
        console.log(User);

        let headers: HttpHeaders | undefined;
        if (User) {
          headers = new HttpHeaders({ Authorization: User });
        }
    
        let posts = this.http.get(this.apiUrl, { headers });
        return posts;
    }

    createPost(newPost: basePost): Observable<any>{
        console.log(newPost);
        return this.http.post(this.apiUrl, newPost);
    }
    
}