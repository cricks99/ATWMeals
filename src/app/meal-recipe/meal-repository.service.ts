import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMeal } from './interfaces/meal';
import { IMealDetail } from './interfaces/mealdetail';
import { ILocalMeal } from './interfaces/local-meal';
import { ILocalMealRatings } from './interfaces/local-meal-ratings';
import { ICountry } from './interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class MealRepositoryService {

  private areaApiUri = "https://www.themealdb.com/api/json/v1/1/filter.php?a="
  private ingredientApiUri = "https://www.themealdb.com/api/json/v1/1/filter.php?i="
  private categoryApiUri = "https://www.themealdb.com/api/json/v1/1/filter.php?c="
  private detailsApiUri = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
  private localMealApiUri = "https://localhost:7077/api/Meal"
  private localMealRatingsAPiUri = "https://localhost:7077/api/MealRating"
  private countryAPIUri = "https://localhost:7077/api/Country"

  constructor(private http: HttpClient) { }

  getAllCountries() {
    return this.http.get<ICountry>(this.countryAPIUri);
  }
  
  getMealsByArea(country: string) {
    return this.http.get<IMeal>(this.areaApiUri + country);
  }

  getMealsByIngredient(ingredient: string) {
    return this.http.get<IMeal>(this.ingredientApiUri + ingredient);
  }

  getMealsByCategory(category: string) {
    return this.http.get<IMeal>(this.categoryApiUri + category);
  }

  addLocalMeal(meal: ILocalMeal) {
    return this.http.post<ILocalMeal>(`${this.localMealApiUri}/add`, meal);
  }

  getRecipeById(mealId: string) {
    return this.http.get<IMealDetail>(this.detailsApiUri + mealId);
  }

  getLocalMealByMealDBId(mealId: string)
  {
    return this.http.get<ILocalMeal>(this.localMealApiUri + "/mealDBId/" + mealId);
  }
  
  getLocalMealById(Id: string)
  {
    return this.http.get<ILocalMeal>(this.localMealApiUri + "/" + Id);
  }

  getLocalAllMeals()
  {
    return this.http.get<ILocalMeal>(this.localMealApiUri);
  }

  getLocalMealRatingsByUserId(Id: string)
  {
    return this.http.get<ILocalMealRatings>(`${this.localMealRatingsAPiUri}/user/${Id}`);
  }

  addLocalMealRating(rating: ILocalMealRatings) {
    return this.http.post<ILocalMealRatings>(`${this.localMealRatingsAPiUri}/add`, rating);
  }
}
