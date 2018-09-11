import { AuthComponent } from './../auth/auth.component';
import { AuthService } from './../_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { Pagination, PaginatedResult } from '../_models/pagination';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  user: User;
  genderList = [{value: 'male', display: 'Male'}, { value: 'female', display: 'Female'}];
  userParams: any = {};
  pagination: Pagination;
  // tslint:disable-next-line:no-shadowed-variable
  constructor( private userService: UserService ,
     private alertify: AlertifyService,
     private router: ActivatedRoute,
     private authService: AuthService ) { }

  ngOnInit() {
    this.router.data.subscribe( data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
      });
      this.user = this.authService.currentUser;
      this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
      this.userParams.MinAge = 18;
      this.userParams.MaxAge = 99;
      this.userParams.orderBy = 'lastActive';
  }
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe(
      (res: PaginatedResult<User[]>) => {
         this.users = res.result;
         this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.MinAge = 18;
    this.userParams.MaxAge = 99;
    this.userParams.orderBy = 'lastActive';
    this.loadUsers();
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
     this.loadUsers();
  }

}
