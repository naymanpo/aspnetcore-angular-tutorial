import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
   model: any = { };
   photoUrl: string;

  constructor(private authservice: AuthService , private alertifyService: AlertifyService, private  route: Router) { }

  ngOnInit() {
    this.authservice.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authservice.login(this.model).subscribe (data => {
      this.alertifyService.success('Login Successfully!');
    },
    error => {
      this.alertifyService.error('Login fail!');
    }, () => {
      this.route.navigate ( ['/members'] );
    } );
  }

  logOut() {
    this.authservice.userToken = null;
    localStorage.removeItem('token');
    this.alertifyService.message('Log out');
    this.route.navigate([ '/home'] );
  }

  loggedIn() {
   // const token = localStorage.getItem('token');
   const token = this.authservice.loggedIn();
  // return !! token;
   return token;
  }
}
