import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// components
import { SidebarComponent } from './shared/sidebar/sidebar.component';
// modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    PostModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
