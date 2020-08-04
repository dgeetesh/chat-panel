import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './../component/login/login.component';
import { SignupComponent } from './../component/signup/signup.component';
import { HomeComponent } from './../component/home/home.component';
import { UsersComponent } from './../component/users/users.component';

import { AuthenticationService } from './../services/authentication.service';


const routes: Routes = [
   { path: '', component: LoginComponent },
   { path: 'signup', component: SignupComponent },
   { path: 'home', component: HomeComponent, canActivate: [AuthenticationService]},
   { path: 'users', component: UsersComponent, canActivate: [AuthenticationService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
