import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { tokenData } from 'src/app/user/interfaces/user.interface';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  username:string = '';
  isLoggedIn:boolean = false;

  constructor(private userService:UserService){}

  ngOnInit(): void {
    //  get key
    let key = this.userService.getSecreKey();
    let localToken = localStorage.getItem(key);

    if(localToken){
      this.userService.getUserData(localToken).subscribe((data)=>{
        for(let user of data){
          this.username = user.name;
        }
      })
      this.isLoggedIn = true;
    }
  }

  logOut(){
    this.userService.logOutUser();
  }
}
