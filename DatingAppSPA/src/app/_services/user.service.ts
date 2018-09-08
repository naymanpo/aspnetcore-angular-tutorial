import { AuthHttp } from 'angular2-jwt';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { RequestOptions, Headers, Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl =  environment.apiUrl;

  constructor(private authHttp: Http) { }
  getUsers(): Observable<User[]>  {
    return this.authHttp.get(this.baseUrl + 'users', this.jwt())
    .map(response => <User[]> response.json())
    .catch(this.handleError);
  }

  getUser( id ): Observable<User> {
    return this.authHttp.get(this.baseUrl + 'users/' + id, this.jwt())
    .map(response => <User> response.json())
    .catch(this.handleError);
  }

  updateUser( id: number, user: User) {
    return this.authHttp.put(this.baseUrl + 'users/' + id, user, this.jwt()).catch(this.handleError);
  }
  private jwt() {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new Headers({'Authorization': 'Bearer ' + token });
      headers.append('Content-Type', 'application/json');
      return new RequestOptions ( {headers: headers} );
    }

  }

  private handleError(error: any) {
    const applicationError = error.headers.get('Applicaton-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
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
