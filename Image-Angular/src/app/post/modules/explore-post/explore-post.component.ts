import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';
import { Post } from '../../interfaces/post.interface';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'post-explore',
  templateUrl: './explore-post.component.html'
})
export class ExplorePostComponent implements OnInit{
  actualUser:string = '';
  isLoggedIn: boolean = false;
  postList: Post[] = [];

  constructor(private userService:UserService, private postService:PostService){}

  ngOnInit(): void {
    let key = this.userService.getSecreKey();
    let localToken = localStorage.getItem(key);

    if(localToken){
      this.isLoggedIn = true;
      this.getAllPosts(localToken);
    } else {
      this.isLoggedIn = false;
    }
    
  }

  getAllPosts(localToken:string){
    this.postService.getAllPosts(localToken).subscribe((posts)=> {
      this.postList = posts;
    });
  }

}
