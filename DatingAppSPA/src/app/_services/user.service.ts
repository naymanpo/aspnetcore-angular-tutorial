import { PaginatedResult } from './../_models/pagination';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import { RequestOptions, Headers, Http, Response } from '@angular/http';

@Injectable()
export class UserService {
  baseUrl =  environment.apiUrl;

  constructor(private authHttp: Http) { }
  getUsers(page?: number, itemsPerPage?: number): Observable<PaginatedResult<User[]>>  {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let queryString = '?';
    if ( page != null && itemsPerPage != null) {
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage;
    }
    return this.authHttp.get(this.baseUrl + 'users' + queryString, this.jwt())
    .map((response: Response) => {
       paginatedResult.result = response.json();
       if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
       }
       return paginatedResult;
    }
    ).catch(this.handleError);
  }

  getUser( id ): Observable<User> {
    return this.authHttp.get(this.baseUrl + 'users/' + id, this.jwt())
    .map(response => <User> response.json())
    .catch(this.handleError);
  }

  updateUser( id: number, user: User) {
    return this.authHttp.put(this.baseUrl + 'users/' + id, user, this.jwt()).catch(this.handleError);
  }
  setMainPhoto(userId: number, id: number) {
    return this.authHttp.put(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {}, this.jwt()).catch(this.handleError);
  }
  deletePhoto(userId: number, id: number) {
    return this.authHttp.delete(this.baseUrl + 'users/' + userId + '/photos/' + id , this.jwt()).catch(this.handleError);
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
