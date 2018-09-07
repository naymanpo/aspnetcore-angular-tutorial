import { Observable } from 'rxjs';
import { Http, RequestOptions , Headers} from '@angular/http';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl =  environment.apiUrl;

  constructor(private http: Http) { }
  getUsers(): Observable<User[]>  {
    return this.http.get(this.baseUrl + 'users', this.jwt())
    .map(response => <User[]> response.json())
    .catch(this.handleError);
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
