import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';
import { PostService } from '../../services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'post-create',
  templateUrl: './create-post.component.html'
})
export class CreatePostComponent implements OnInit{
  inputData: FormGroup;
  actualUser:string = '';
  
  constructor(private userService:UserService, private postService:PostService, private formBuilder:FormBuilder){
    this.inputData = this.formBuilder.group({
      title:['',Validators.required],
      description:['',Validators.required]
    });
  }

  ngOnInit(): void {
    //  get key
    const key = this.userService.getSecreKey();
    const User = localStorage.getItem(key);

    if(User){
      this.actualUser = User;
    }
  }

  onSubmitform(){
    if(this.inputData.value.title !== '' && this.inputData.value.description !== ''){
      let username = this.userService.actualUserName;

      let user = {
       
        title: this.inputData.value.title,
        description: this.inputData.value.description,
        createdBy: username
      }

      this.postService.createPost(user).subscribe((msg) => {
        console.log(msg)
      })
    }
  }
}