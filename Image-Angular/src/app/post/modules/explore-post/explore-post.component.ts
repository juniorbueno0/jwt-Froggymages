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
  postList: Post[] = [];

  constructor(private userService:UserService, private postService:PostService){}

  ngOnInit(): void {
    //  get key
    const key = this.userService.getSecreKey();
    const User = localStorage.getItem(key);

    if(User){
      this.actualUser = User;
      this.getAllPosts();
    }
    
  }

  getAllPosts(){
    this.postService.getAllPosts().subscribe((posts)=> {
      console.log(posts);
      this.postList = posts;
    });
  }

}
