import { AuthService } from './_services/auth.service';
import { JwtHelper } from 'angular2-jwt';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { letProto } from 'rxjs-compat/operator/let';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'DatingAppSPA';
  jwtHelper = new JwtHelper();
  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user') ;
    let user: User;
    if ( userString !== 'undefined' ) {
      user = JSON.parse(userString);
    }
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

      if (user) {
        this.authService.currentUser = user;
        this.authService.changeMemberPhotoUrl(user.photoUrl);
      }
  }
}
