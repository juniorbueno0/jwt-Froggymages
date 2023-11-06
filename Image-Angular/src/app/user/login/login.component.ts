import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { tokenData } from '../interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {
  formData: FormGroup;
  private key:string = `my-turtle-key`;
  isLogedIn:boolean = false;
  actualUser:string = '';
  actualApiRes: tokenData = {name:'', token:''}; 

  constructor(private formBuilder: FormBuilder, private userService:UserService, private router:Router){
    this.formData = formBuilder.group({
      name:['',Validators.required],
      password:['',Validators.required]
    })

    // check if the user is alredy loged in
    const key = this.userService.getSecreKey();
    const User = localStorage.getItem(key);
    if(User){ this.actualUser = User; this.isLogedIn = true; }
  }

  onSubmitLogin(){
    console.log('component', this.formData.value.name, this.formData.value.password);

    if(this.formData.value.name !== '' && this.formData.value.password !== ''){
      
      const user = {
        name:this.formData.value.name,
        password:this.formData.value.password
      }

      this.userService.logInUsers(user).subscribe(async (data)=>{
        console.log(data);
        this.actualApiRes = data;
        this.userService.storeLogInData(this.actualApiRes);
        this.formData.reset();
      });

      
    }
  }

  logOut(){
    this.userService.logOutUser();
  }

}
