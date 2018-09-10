import { JwtHelper } from 'angular2-jwt';
import { AuthService } from './../_services/auth.service';
import { AlertifyService } from './../_services/alertify.service';

import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable, NgModule } from '@angular/core';
import { UserService } from '../_services/user.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(
        private userService: UserService,
        private alertify: AlertifyService,
        private router: Router,
        private authService: AuthService ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        const userId = this.authService.decodedToken.nameid;
        return this.userService.getUser(userId).catch(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/members']);
            return Observable.of(null);
        });
    }
}
