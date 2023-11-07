import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user/services/user.service';
import { PostService } from '../../services/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tokenData } from 'src/app/user/interfaces/user.interface';

@Component({
  selector: 'post-create',
  templateUrl: './create-post.component.html'
})
export class CreatePostComponent implements OnInit{
  inputData: FormGroup;
  actualUser:tokenData = {name:'', token:''};
  username:string = '';
  
  constructor(private userService:UserService, private postService:PostService, private formBuilder:FormBuilder){
    this.inputData = this.formBuilder.group({
      title:['',Validators.required],
      description:['',Validators.required]
    });
  }

  ngOnInit(): void {
    let key = this.userService.getSecreKey();
    let localToken = localStorage.getItem(key);

    if(localToken){
      this.userService.getData(localToken).subscribe((data)=>{
        for(const user of data){
          this.username = user;
        }
      });

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