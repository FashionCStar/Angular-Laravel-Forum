import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {User} from '../models/user';
import * as Constants from '../app.const';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: User;
  private subject = new Subject<any>();
  constructor(private http: HttpClient) { }

  setUser(user: User) {
    this.user = user;
    this.subject.next(this.user);
  }

  getUser() {
    return this.subject.asObservable();
  }

  public getUsers() {
    return this.http
        .get(Constants.API_URL + '/api/getUsers', this.jwt())
        .pipe(
            map((response: Response) => response)
        );
  }

  public updateUser(data) {
    return this.http
        .post(Constants.API_URL + '/api/updateUser',data, this.jwt())
        .pipe(
            map((response: Response) => response)
        );
  }

  public getUserById(id) {
    return this.http
        .get(Constants.API_URL + '/api/getUser/' + id, this.jwt())
        .pipe(
            map((response: Response) => response)
        );
  }

  public verifyUserEmail(path) {
    return this.http
        .get(Constants.API_URL + '/api' + path)
        .pipe(
            map((response: Response) => response)
        );
  }

  activeUser(userId, status) {
    let is_activated = 1;
    if (!status) {
      is_activated = 0;
    }
    return this.http
        .post(Constants.API_URL + '/api/activeUser',{
          id: userId,
          is_activated: is_activated,
        }, this.jwt())
        .pipe(
            map((response: Response) => response)
        );
  }

  delUser(userId) {
    return this.http
        .delete(Constants.API_URL + '/api/user/' + userId, this.jwt())
        .pipe(
            map((response: Response) => response)
        );
  }

  uploadPhoto(userId, formdata) {
    return this.http
        .post(Constants.API_URL + '/api/user/' + userId + '/photo', formdata, )
        .pipe(
            map((response: Response) => response)
        );
  }
  private jwt() {
    if (localStorage.getItem("token")) {
      const headers = new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"));
      return {headers: headers};
    }
  }
}