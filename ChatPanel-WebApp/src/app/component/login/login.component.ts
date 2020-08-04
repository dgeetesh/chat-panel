import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted  =  false;
  email:string;
  password :string;
  constructor( private formBuilder: FormBuilder,private router: Router,private apiService:ApiService,public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      emailControl:this.emailControl,
      passwordControl:this.passwordControl
    });
  }
  emailControl = new FormControl('', [
    Validators.required
    ]);


  passwordControl = new FormControl('', [
    Validators.required
    ]);

    login(){
      console.log(this.loginForm)
      if(this.loginForm.valid){

        const payload: any = {};
        payload.email = this.email;
        payload.password = this.password;

        this.apiService.postCallback('users/login', payload).subscribe(response => {
          if(response){
          this.authenticationService.setAccessToken(response.user.token);
          this.authenticationService.setUser(response.user);
          localStorage.setItem("userId",response.user._id);
          localStorage.setItem("userName",response.user.firstName);
            this.router.navigate(['/home']);
          }else{
            this.router.navigate(['']);
          }
      })

    }
  }
    signup(){
      this.router.navigate(['signup']);

    }


  };



