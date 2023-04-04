import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalService } from 'src/app/local.service';
import { IUser } from 'src/app/user-profile/interfaces/user';
import { UserRepositoryService } from 'src/app/user-profile/user-repository.service';
import { ILocalMeal } from '../interfaces/local-meal';
import { IMeal } from '../interfaces/meal';
import { MealRepositoryService } from '../meal-repository.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  
  constructor(private repositoryService: MealRepositoryService, private localStore: LocalService,
    private userRepo: UserRepositoryService) { }

  countryMeals: IMeal | undefined;
  countries: any;
  selectedCountry?: any;
  searchValue?: any;
  foundIngredients: boolean = false;
  ingRecipes: IMeal | undefined;
  localMeals: any = [];
  sortedRatings: any;
  showTop10: boolean = false;
  showIngSearch: boolean = false;
  showCountryFlags: boolean = true;

  user: IUser = {id: 0, name: "", password: "", favorites: [], passports: [], mealRatings: []}

  getUserObject() {
    let savedUserId = this.localStore.getData("userId");

    if (savedUserId && +savedUserId > 0) {
      this.userRepo.getUserById(savedUserId).subscribe (
        (response) => {this.user = response;});

    this.getLocalMeals();
    }
  }

  onSelect(country: any): void {
    this.selectedCountry = country.name;
    this.repositoryService.getMealsByArea(this.selectedCountry).subscribe(
      (response) => {this.countryMeals = response;}
    )
  }

  searchMealsByIngredient(form: NgForm) {
      this.searchValue = form.form.value.searchValue;
      this.repositoryService.getMealsByIngredient(this.searchValue).subscribe(
        (response) => {
          this.ingRecipes = response;
          this.foundIngredients = true;
        }
      )
  }

  isUserFavorite(mealId: number): boolean
  {
    return this.user.favorites.find(x => x.mealId === mealId) != null;
  }

  setUnsetFavorite(userId: number, mealId: number) {
    this.userRepo.setUnsetFavorite(userId, mealId).subscribe (
      (response) => { this.getUserObject() }
    )
  }

  getLocalMeals() {
    this.repositoryService.getLocalAllMeals().subscribe(
      (response) =>
      {
        this.localMeals = response;
        this.sortedRatings = this.localMeals.sort((a: any, b: any) => b.avgRating - a.avgRating).slice(0,10);
      }
    )
  }

  toggleTop10(): void{
    this.showTop10 = true;
    this.showIngSearch = false;
    this.showCountryFlags = false;
  }

  toggleIngSearch(): void{
    this.showIngSearch = true;
    this.showTop10 = false;
    this.showCountryFlags = false;
  }

  toggleCountryFlags(): void{
    this.showCountryFlags = true;
    this.showTop10 = false;
    this.showIngSearch = false;
  }

  ngOnInit(): void {
    this.getUserObject();

    this.repositoryService.getAllCountries().subscribe(
      (response) => {this.countries = response;}
    )
  }
}
