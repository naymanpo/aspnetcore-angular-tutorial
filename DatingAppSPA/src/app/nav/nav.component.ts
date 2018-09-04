import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
   model: any = { };

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authservice.login(this.model).subscribe (data => {
      console.log('Login Successfully');
    },
    error => {
      console.log('Login fail!');
    } );
  }

  logOut() {
    this.authservice.userToken = null;
    localStorage.removeItem('token');
    console.log('Log out');
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !! token;
  }
}
