import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { bUser } from '../interfaces/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  inputData: FormGroup;
  title:string = '';

  constructor(private formBuilder:FormBuilder, private userService:UserService){
    this.inputData = formBuilder.group({
      name:['',Validators.required, Validators.pattern('[a-zA-Z ]*')],
      email:['',Validators.required, Validators.pattern('[a-zA-Z@.]*')],
      password:['',Validators.required],
    })
  }

  ngOnInit(): void {

  }

  onSubmitForm(){
    if(this.inputData.value.name !== '' && this.inputData.value.password !== '' && this.inputData.value.email !== ''){
      
      const newUser:bUser = {
        name:this.inputData.value.name,
        email:this.inputData.value.email,
        password:this.inputData.value.password
      }


      this.userService.createUsers(newUser).subscribe((res)=>{
        console.log(res);
        this.inputData.reset();
      });
      
    }
  }

}
