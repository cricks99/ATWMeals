import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMeal } from './interfaces/meal';

@Injectable({
  providedIn: 'root'
})
export class MealRepositoryService {

  private areaApiUri = "https://www.themealdb.com/api/json/v1/1/filter.php?a="
  private ingredientApiUri = "https://www.themealdb.com/api/json/v1/1/filter.php?i="
  private categoryApiUri = "https://www.themealdb.com/api/json/v1/1/filter.php?c="
  private detailsApiUri = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="

  constructor(private http: HttpClient) { }

  getMealsByArea(country: string) {
    return this.http.get(this.areaApiUri + country);
  }

  getMealsByIngredient(ingredient: string) {
    return this.http.get(this.ingredientApiUri + ingredient);
  }

  getMealsByCategory(category: string) {
    return this.http.get(this.categoryApiUri + category);
  }

  getRecipeById(mealId: string) {
    return this.http.get(this.detailsApiUri + mealId);
  }
}
