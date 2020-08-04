import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { constants } from './../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {
  public user: String= '';

  public token: String = '';
  constructor(private router: Router) { 
   // this.setUser(JSON.parse(sessionStorage.getItem(constants.storageConstants.USER)));


    this.setAccessToken(JSON.parse(sessionStorage.getItem(constants.storageConstants.ACCESS_TOKEN)));

    this.setUser(JSON.parse(sessionStorage.getItem(constants.storageConstants.USER)));
  }

  canActivate() {
    
    if (this.token) {

      return true;
    } else {
     // this.router.navigate(['']);
      //this.toasterService.pop('warn', 'Authentication Message', 'Please login into application before accessing the services.');
      return false;
    }
  }
  
    public getUser() {
      return this.user;
    }
  
  public setUser(data: string) {

    this.user = data;
    sessionStorage.setItem(constants.storageConstants.USER, JSON.stringify(data));
  }
  public getAccessToken() {
    return this.token;
  }
  public setAccessToken(data: string) {
    this.token = data;
   sessionStorage.setItem(constants.storageConstants.ACCESS_TOKEN, JSON.stringify(data));
  }
}

