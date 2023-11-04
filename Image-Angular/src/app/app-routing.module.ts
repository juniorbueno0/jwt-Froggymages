import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { ContentComponent } from './user/content/content.component';
import { LoginComponent } from './user/login/login.component';
import { CreatePostComponent } from './post/modules/create-post/create-post.component';
import { ExplorePostComponent } from './post/modules/explore-post/explore-post.component';

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'main',component:ContentComponent},
  {path:'create',component:CreatePostComponent},
  {path:'explore',component:ExplorePostComponent},
  {path:'', redirectTo:'register',pathMatch:'full'},
  {path:'**', redirectTo:'register'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }