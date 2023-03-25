import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LocalService } from 'src/app/local.service';
import { IUser } from 'src/app/user-profile/interfaces/user';
import { UserRepositoryService } from 'src/app/user-profile/user-repository.service';
import { IMeal } from '../interfaces/meal';
import { MealRepositoryService } from '../meal-repository.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  
  constructor(private repositoryService: MealRepositoryService, private localStore: LocalService,
    private userRepo: UserRepositoryService) {}

  countryMeals: IMeal | undefined;
  countries: any;
  selectedCountry?: any;
  searchValue?: any;
  foundIngredients: boolean = false;
  ingRecipes: IMeal | undefined;
  user: IUser = {id: 0, name: "", password: "", favorites: [], passports: [], mealRatings: []}

  getUserObject() {
    let savedUserId = this.localStore.getData("userId");

    if (savedUserId && +savedUserId > 0) {
      this.userRepo.getUserById(savedUserId).subscribe (
        (response) => {this.user = response;});
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
      form.resetForm();
  }

  ngOnInit(): void {
    this.getUserObject();

    this.repositoryService.getAllCountries().subscribe(
      (response) => {this.countries = response;}
    )
  }
}
