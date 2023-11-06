import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, Userss } from '../interfaces/user.interface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})

export class ContentComponent implements OnInit {
  users: Userss[] = [{
    "id": "1",
    "name": "John Doe",
    "job": "Software Engineer",
    "company": "Google",
    "location": "Mountain View, CA",
    "favColor": "Blue"
  },
  {
    "id": "2",
    "name": "Jane Doe",
    "job": "Product Manager",
    "company": "Facebook",
    "location": "Menlo Park, CA",
    "favColor": "Green"
  },
  {
    "id": "3",
    "name": "Peter Parker",
    "job": "Web Developer",
    "company": "Microsoft",
    "location": "Redmond, WA",
    "favColor": "Red"
  },
  {
    "id": "4",
    "name": "Mary Smith",
    "job": "Designer",
    "company": "Apple",
    "location": "Cupertino, CA",
    "favColor": "Pink"
  },
  {
    "id": "5",
    "name": "David Jones",
    "job": "Analyst",
    "company": "Amazon",
    "location": "Seattle, WA",
    "favColor": "Orange"
  },
  {
    "id": "6",
    "name": "Susan Williams",
    "job": "Marketing Manager",
    "company": "Tesla",
    "location": "Austin, TX",
    "favColor": "Yellow"
  },
  {
    "id": "7",
    "name": "Michael Brown",
    "job": "Sales Representative",
    "company": "IBM",
    "location": "Armonk, NY",
    "favColor": "Purple"
  },
  {
    "id": "8",
    "name": "Patricia Garcia",
    "job": "Customer Support Representative",
    "company": "Microsoft",
    "location": "Redmond, WA",
    "favColor": "Teal"
  },
  {
    "id": "9",
    "name": "William Miller",
    "job": "Account Manager",
    "company": "Google",
    "location": "Mountain View, CA",
    "favColor": "Indigo"
  },
  {
    "id": "10",
    "name": "Elizabeth Johnson",
    "job": "Teacher",
    "company": "New York City Public Schools",
    "location": "New York, NY",
    "favColor": "Violet"
  }];
  userList:User[] = [];
  actualUser:string = '';
  isLogedIn:boolean = false;

  constructor(private readonly userService:UserService){}
  
  ngOnInit(): void {
    const key = this.userService.getSecreKey();
    const User = localStorage.getItem(key);

    if(User){
      this.actualUser = User; 
      this.isLogedIn = true; 

      this.userService.findAllUsers().subscribe((users)=>{
        this.userList = users;
      });
    }

  }

  updateUser(user: any, id:string, name:string, job:string, company:string, location:string, favColor:string){
    const newUser = {
      id:id,
      name:name,
      job:job,
      company:company,
      location:location,
      favColor:favColor
    };

    console.log('user:',user,'replace for:', newUser);
    user = newUser;
    console.log('FINAL', user);
  }

}