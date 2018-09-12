import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer: 'Unread';
  constructor(private authService: AuthService,
      private alertifyService: AlertifyService,
      private route: ActivatedRoute,
      private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;

    }, error => {
      this.alertifyService.error('Error load message');
    });
  }
  loadMessages() {
    this.userService
        .getMessages(this.authService.decodedToken.nameid,
          this.pagination.currentPage,
          this.pagination.itemsPerPage,
          this.messageContainer)
          .subscribe( ( res: PaginatedResult<Message[]>) => {
            this.messages = res.result;
            this.pagination = res.pagination;
          }, error => {
            this.alertifyService.error(error);
          }
        );
  }

}
