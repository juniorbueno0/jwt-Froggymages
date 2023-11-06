import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'post-create',
  templateUrl: './create-post.component.html'
})
export class CreatePostComponent implements OnInit{
  actualUser:string = '';
  
  constructor(private userService:UserService){}

  ngOnInit(): void {
    //  get key
    const key = this.userService.getSecreKey();
    const User = localStorage.getItem(key);

    if(User){
      this.actualUser = User;
    }
  }
}
