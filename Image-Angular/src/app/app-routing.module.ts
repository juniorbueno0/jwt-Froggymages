import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { ContentComponent } from './user/content/content.component';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'main',component:ContentComponent},
  {path:'login',component:LoginComponent},
  {path:'', redirectTo:'register',pathMatch:'full'},
  {path:'**', redirectTo:'register'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }