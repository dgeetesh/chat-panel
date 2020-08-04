import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ApiService } from './../services/api.service'
import { AuthenticationService } from './../services/authentication.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './../component/app/app.component';
import { LoginComponent } from './../component/login/login.component';
import { SignupComponent } from './../component/signup/signup.component';
import { HomeComponent } from './../component/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {ChatService} from '../services/chat.service'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

  ],
  providers: [ApiService,AuthenticationService,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
