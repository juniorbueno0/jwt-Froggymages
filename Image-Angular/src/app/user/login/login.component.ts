import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  formData: FormGroup;
  isLogedIn:boolean = false;
  username:string = '';

  constructor(private formBuilder: FormBuilder, private userService:UserService, private router:Router){
    this.formData = formBuilder.group({
      name:['',Validators.required],
      password:['',Validators.required]
    })
  }

  ngOnInit(): void {
    let key = this.userService.getSecreKey();
    let localToken = localStorage.getItem(key);
  
    if(localToken!== null){ 

      this.userService.getData(localToken).subscribe((data)=>{
        for(let user of data){
          this.username = user.name;
        }
      });

      this.isLogedIn = true;
    } else {
      this.isLogedIn = false;
    }

  }

  onSubmitLogin(){
    console.log('component', this.formData.value.name, this.formData.value.password);
    if(this.formData.value.name !== '' && this.formData.value.password !== ''){

      const user = {
        name:this.formData.value.name,
        password:this.formData.value.password
      }

      this.userService.logInUsers(user).subscribe(async (data)=>{
        this.userService.storeLogInData(data);
        this.formData.reset();
      }); 

    }

  }

  logOut(){
    this.userService.logOutUser();
  }

}
