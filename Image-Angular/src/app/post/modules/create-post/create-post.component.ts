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
  username:string = '';
  isLoggedIn:boolean = false;
  
  constructor(private userService:UserService, private postService:PostService, private formBuilder:FormBuilder){
    this.inputData = this.formBuilder.group({
      title:['',Validators.required],
      description:['',Validators.required]
    });
  }

  ngOnInit(): void {
    let key = this.userService.getSecreKey();
    const localToken = localStorage.getItem(key);

    if(localToken){
      this.userService.getUserData(localToken).subscribe((data)=>{
        for(const user of data){
          this.username = user;
        }
      });

      this.isLoggedIn=true;
    }

  }

  onSubmitform(){
    if(this.inputData.value.title !== '' && this.inputData.value.description !== ''){
      let username = this.userService.actualUserData.name; // here

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