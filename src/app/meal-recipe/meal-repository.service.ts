import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMeal } from './interfaces/meal';

@Injectable({
  providedIn: 'root'
})
export class MealRepositoryService {

  private areaApiUri = "www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"

  constructor(private http: HttpClient) { }

  getMealsByArea() {
    return this.http.get(this.areaApiUri)
  }
}
