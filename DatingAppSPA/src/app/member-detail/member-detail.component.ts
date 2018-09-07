import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
      console.log(data['user']);
    });
    // this.loadUser();
  }
  loadUser() {
    this.userService.getUser(this.route.snapshot.params['id']).subscribe(
      (user: User) => {
        this.user = user;
      }, error => {
        this.alertifyService.error(error);
      }
    );
  }
}
