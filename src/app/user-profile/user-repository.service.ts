import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  constructor(private http: HttpClient) { }
  apiUri: string = 'https://localhost:7077/api/User'

  //getUser(userName: string) {
  //  return this.http.get(`${this.apiUri}/${userName}`)
  //}

  getUserByPassword(user: IUser) {
    return this.http.post<IUser>(`${this.apiUri}/GetUserByPassword`, user);
  }

  addUser(user: IUser) {
    return this.http.post<IUser>(`${this.apiUri}/add`, user);
  }
}
