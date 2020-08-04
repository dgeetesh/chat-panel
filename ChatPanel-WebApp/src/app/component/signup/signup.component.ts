import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  public firstName: String;
  public lastName: String;
  public email: String;
  public number:Number;
  public password: String;
  public confirmPassword: String;


  constructor(private toastr: ToastrService, private formBuilder: FormBuilder,private router: Router,private apiService:ApiService) {

  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstNameControl:this.firstNameControl,
      lastNameControl:this.lastNameControl,
      emailControl:this.emailControl,
      passwordControl:this.passwordControl,
    });

  }
  firstNameControl = new FormControl('', [
    Validators.required
  ]);
  lastNameControl = new FormControl('', [
    Validators.required
  ]);

  emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  passwordControl = new FormControl('', [
    Validators.required
  ]);

  signup(){
    if(this.signupForm.valid)
    {
      const payload: any = {};
      payload.email = this.email;
      payload.password = this.password;
      payload.firstName = this.firstName;
      payload.lastName=this.lastName;
      console.log(payload)
      this.apiService.postCallback('users/signUp', payload).subscribe(response => {
        if (response && response.result && response.successCode) {
          this.toastr.success( "User Register Successfully",'success');
           this.router.navigate([''])
        }else if(response.statusCode==409){
          this.toastr.info("Emal ID Already Exsist", 'Information');
           this.router.navigate(['signup']);
        }

      })

    }else{
      this.toastr.warning( "All Fields Are Mandatory",'warning');

    }
  }


}
