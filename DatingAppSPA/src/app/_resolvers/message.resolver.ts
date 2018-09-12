import { AuthService } from './../_services/auth.service';
import { PaginatedResult } from './../_models/pagination';
import { AlertifyService } from './../_services/alertify.service';

import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Message } from '../_models/message';

@Injectable()
export class MessageResolver implements Resolve<Message[]> {
    pageSize = 5;
    pageNumber = 1;
    messageContainer = 'Unread';
    constructor(
        private userService: UserService,
        private authService: AuthService,
        private alertify: AlertifyService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
        return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber,
            this.pageSize, this.messageContainer).catch(error => {
            this.alertify.error('Problem retrieving data');
            return Observable.of(null);
        });
    }
}
