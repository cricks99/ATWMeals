import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFavorite } from './interfaces/favorite';
import { IPassport } from './interfaces/passport';
import { IUser } from './interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  constructor(private http: HttpClient) { }
  // apiUri: string = 'https://localhost:7077/api/User'
  // apiPassportUri: string = 'https://localhost:7077/api/Passport'
  // apiFavoriteUri: string = 'https://localhost:7077/api/Favorite'

  apiUri: string = 'https://atwmealsapi20230401.azurewebsites.net/api/User'
  apiPassportUri: string = 'https://atwmealsapi20230401.azurewebsites.net/api/Passport'
  apiFavoriteUri: string = 'https://atwmealsapi20230401.azurewebsites.net/api/Favorite'

  getUser(userName: string) {
    return this.http.get<IUser>(`${this.apiUri}/${userName}`)
  }

  getUserById(id: string) {
    return this.http.get<IUser>(`${this.apiUri}/id/${id}`)
  }

  getUserByPassword(user: IUser) {
    return this.http.post<IUser>(`${this.apiUri}/GetUserByPassword`, user);
  }

  addUser(user: IUser) {
    return this.http.post<IUser>(`${this.apiUri}/add`, user);
  }

  getPassportByUserId(id: string) {
    return this.http.get<IPassport>(`${this.apiPassportUri}/${id}`)
  }

  addPassport(userId: number, countryId: number) {
    return this.http.post(`${this.apiPassportUri}/add/${userId}/${countryId}`, null);
  }

  getAllFavorites() {
    return this.http.get<IFavorite>(`${this.apiFavoriteUri}`)
  }

  getFavoritesByUserId(userId: string)
  {
    return this.http.get<IFavorite>(`${this.apiFavoriteUri}/${userId}`)
  }
  
  setUnsetFavorite(userId: number, mealId: number) {
    return this.http.post(`${this.apiFavoriteUri}/setUnset/${userId}/${mealId}`, null);
  }
}
