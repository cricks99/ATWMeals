import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IMeal } from './interfaces/meal';
import { IMealDetail } from './interfaces/mealdetail';
import { ILocalMeal } from './interfaces/local-meal';
import { ILocalMealRatings } from './interfaces/local-meal-ratings';
import { ICountry } from './interfaces/country';
import { INutrition } from './interfaces/nutrition';

@Injectable({
  providedIn: 'root'
})
export class MealRepositoryService {
  private areaApiUri = "https://www.themealdb.com/api/json/v1/1/filter.php?a="
  private ingredientApiUri = "https://www.themealdb.com/api/json/v1/1/filter.php?i="
  private categoryApiUri = "https://www.themealdb.com/api/json/v1/1/filter.php?c="
  private detailsApiUri = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="

  // private localMealApiUri = "https://localhost:7077/api/Meal"
  // private localMealRatingsAPiUri = "https://localhost:7077/api/MealRating"
  // private countryAPIUri = "https://localhost:7077/api/Country"
  private nutritionAPIUri = "https://api.api-ninjas.com/v1/nutrition?query="
  
  private localMealApiUri = "https://atwmealsapi20230401.azurewebsites.net/api/Meal"
  private localMealRatingsAPiUri = "https://atwmealsapi20230401.azurewebsites.net/api/MealRating"
  private countryAPIUri = "https://atwmealsapi20230401.azurewebsites.net/api/Country"

  constructor(private http: HttpClient) { }

  getAllCountries() {
    return this.http.get<ICountry>(this.countryAPIUri);
  }

  getCountryIdByName(country: string) {
    return this.http.get<number>(`${this.countryAPIUri}/name/${country}`);
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

  //pass space-delimited ingridents to get back ingredient details list
  //"salt potato clam chowder" would return 3 items in list
  getNutrition(ingredients: string) {
    return this.http.get<INutrition>(`${this.nutritionAPIUri}${ingredients}`,
    {
      headers: new HttpHeaders({ "X-Api-key": "3RdKNCwsdaRrIbbASOAkrQ==eu43DRdrzsgmS6cf" })
    }
    );
  }

  addLocalMeal(mealDBId: number, name: string, countryId: number) {
    return this.http.post<number>(`${this.localMealApiUri}/add/${mealDBId}/${name}/${countryId}`, null);
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
    return this.http.post(`${this.localMealRatingsAPiUri}/add`, rating);
  }
}
