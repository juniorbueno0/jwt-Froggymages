import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
      this.actualUser = User;
      this.isLoggedIn= true;
    }
  }

  logOut(){
    this.userService.logOutUser();
  }
}
