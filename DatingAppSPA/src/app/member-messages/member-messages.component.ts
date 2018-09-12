import { AlertifyService } from './../_services/alertify.service';
import { AuthComponent } from './../auth/auth.component';
import { UserService } from './../_services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() userId: number;
  messages: Message[];
  constructor(private userService: UserService,
      private authService: AuthService,
      private alertifyService: AlertifyService) { }

  ngOnInit() {
  }
  loadMessages() {
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.userId).subscribe(
      messages => {
        this.messages = messages;
      }, error => {
        this.alertifyService.error(error);
      }
    );
  }
}
