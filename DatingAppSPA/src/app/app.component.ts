import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
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
  jwtHelper = new JwtHelper();
  title = 'DatingAppSPA';
  constructor(private authService: AuthService, private  userService: UserService, private alertify: AlertifyService) {

  }
  ngOnInit(): void {
  }
}
