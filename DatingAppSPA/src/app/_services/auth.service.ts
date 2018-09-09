import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions , Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { tokenNotExpired, JwtHelper, AuthHttp } from 'angular2-jwt';
import { BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable()
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;
  currentUser: User;
  private photoUrl = new BehaviorSubject<string>('./../../assets/download.png' );
  currentPhotoUrl = this.photoUrl.asObservable();
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  constructor(private http: Http) {
   }
   changeMemberPhotoUrl(photoUrl: string) {
     this.photoUrl.next(photoUrl);
   }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login' , model, this.requestOptions() ).map(( response: Response )  => {
      const user = response.json();
      if (user) {
        localStorage.setItem('token', user.tokenString);
        this.decodedToken = this.jwtHelper.decodeToken( user.tokenString );
        this.currentUser = user.user;
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        this.userToken = user.tokenString;
        this.changeMemberPhotoUrl(this.currentUser.photoUrl);
      }
    }).catch(this.handleError);
  }
  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model , this.requestOptions() );
  }
  private requestOptions() {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    return options;
  }
  loggedIn() {
      return tokenNotExpired('token');
  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Applicaton-Error');
    if (applicationError) {
      return Observable.throw(applicationError );
    }

    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    );
  }

}
