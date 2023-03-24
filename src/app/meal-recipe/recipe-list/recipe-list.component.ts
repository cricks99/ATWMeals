import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IMeal } from '../interfaces/meal';
import { MealRepositoryService } from '../meal-repository.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {
  
  constructor(private repositoryService: MealRepositoryService) {}

  countryMeals: IMeal | undefined;
  countries: any;
  selectedCountry?: any;
  searchValue?: any;
  foundIngredients: boolean = false;
  ingRecipes: IMeal | undefined;

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
    this.repositoryService.getAllCountries().subscribe(
      (response) => {this.countries = response;}
    )
  }
}
