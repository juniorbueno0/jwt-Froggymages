import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { tokenData } from 'src/app/user/interfaces/user.interface';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  actualUser:string = '';
  isLoggedIn:boolean = false;

  constructor(private userService:UserService){}

  ngOnInit(): void {
    //  get key
    const key = this.userService.getSecreKey();
    const User = localStorage.getItem(key);

    if(User){
      this.actualUser = this.userService.actualUserData.name;
      this.isLoggedIn= true;
    }
  }

  logOut(){
    this.userService.logOutUser();
  }
}
