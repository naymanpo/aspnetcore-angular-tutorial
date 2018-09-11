import { PaginatedResult } from './../_models/pagination';
import { AlertifyService } from './../_services/alertify.service';

import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
    pageSize = 5;
    pageNumber = 1;
    likesParam = 'likers';
    constructor(
        private userService: UserService,
        private alertify: AlertifyService,
        private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers (this.pageNumber, this.pageSize, null, this.likesParam).catch(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return Observable.of(null);
            });
        }
}
