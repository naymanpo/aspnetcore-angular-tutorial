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
  pagination: Pagination;
  // tslint:disable-next-line:no-shadowed-variable
  constructor( private userService: UserService , private alertify: AlertifyService, private router: ActivatedRoute ) { }

  ngOnInit() {
    this.router.data.subscribe( data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
      });
  }
  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
      (res: PaginatedResult<User[]>) => {
         this.users = res.result;
         this.pagination = res.pagination;
         console.log(this.pagination);
      }, error => {
        this.alertify.error(error);
      });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
     this.loadUsers();
  }

}
