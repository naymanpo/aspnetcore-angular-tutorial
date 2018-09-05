import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
   model: any = { };

  constructor(private authservice: AuthService , private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    this.authservice.login(this.model).subscribe (data => {
      this.alertifyService.success('Login Successfully!');
    },
    error => {
      this.alertifyService.error('Login fail!');
    } );
  }

  logOut() {
    this.authservice.userToken = null;
    localStorage.removeItem('token');
    this.alertifyService.message('Log out');
  }

  loggedIn() {
   // const token = localStorage.getItem('token');
   const token = this.authservice.loggedIn();
  // return !! token;
   return token;
  }
}
