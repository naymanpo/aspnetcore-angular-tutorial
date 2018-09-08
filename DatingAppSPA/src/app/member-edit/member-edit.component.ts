import { JwtHelper } from 'angular2-jwt';
import { AlertifyService } from './../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../_models/user';
import { NgForm } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  user: User;
  jwtHelper = new JwtHelper();
  @ViewChild('editForm') editForm: NgForm;
  constructor(
    private router: ActivatedRoute,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private authService: AuthService, ) { }

  ngOnInit() {
    this.router.data.subscribe(
      data => {
        this.user = data['user'];
      }
    );
  }
  updateUser() {
    const userId = this.jwtHelper.decodeToken(localStorage.getItem('token')).nameid;
    this.userService.updateUser(userId, this.user).subscribe( next => {
      this.alertifyService.success('update user successfully');
      this.editForm.reset(this.user);
    }, error => {
      this.alertifyService.error(error);
    });
  }

}
