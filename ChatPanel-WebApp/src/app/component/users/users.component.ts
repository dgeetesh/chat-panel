import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userName:any;
  users:any;
  items:any=[];
  email:any;
  constructor(public authenticationService: AuthenticationService,
    private apiService:ApiService,private router: Router) {
    this.users=this.authenticationService.getUser();
    this.userName=this.users.firstName;
    this.email=this.users.email;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  navigateTo(val){
    this.router.navigate([val]);
  }

  getUsers(){
    this.apiService.getCallback('users/list').subscribe(response => {
      if(response){
        this.items=response.result;
      }

  });
}
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/']);
  }
}
