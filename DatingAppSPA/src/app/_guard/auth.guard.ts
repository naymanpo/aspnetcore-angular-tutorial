import { UserService } from './../_services/user.service';
import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private userService: UserService, private  router: Router, private alertify: AlertifyService ) {
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if ( this.authService.loggedIn()) {
        const userId = this.authService.decodedToken.nameid;
        this.userService.getUser(userId).subscribe(data => {
          this.authService.currentUser = data;
          if  (data.photoUrl !== null) {
            this.authService.changeMemberPhotoUrl(data.photoUrl);
          }
        });
      return true;
    }
    this.alertify.error('You need to login to use this area');
    this.router.navigate(['/home']);
    return false;
  }
}
