import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMealDetail } from '../interfaces/mealdetail';
import { INutrition } from '../interfaces/nutrition';
import { MealRepositoryService } from '../meal-repository.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  //@Input() mealId: string = "52772";
choiceMeal: IMealDetail | undefined;

mealId: string = "";
mealName: string = "";
countryName: string = "";
nutritions: INutrition | any;
ingredients: string = "3/4 cup soy  sauce, 1/2 teaspoon ground ginger, 4 Tablespoons cornstarch";

constructor(private repositoryService: MealRepositoryService, private route: ActivatedRoute) {}

ngOnInit(): void {
  this.mealId = this.route.snapshot.params['mealId'];
  this.countryName = this.route.snapshot.params['countryName'];
  this.mealName = this.route.snapshot.params['mealName'];

  this.repositoryService.getRecipeById(this.mealId).subscribe(
    (response) => {this.choiceMeal = response;}
  )

  //create an array with 2 strings
  //strIngredient1 and strMeasure1
  //strIngredient2 and strMeasure2
  //strIngredient3 and strMeasure3
  //etc.

  //then loop through array to create a single string in this.ingredients
  //this.ingredients = strMeasure1 + " " + strIngreident1 + ", " +
  //  strMeasure2 + " " + strIngreident3 + ", " +
  //  strMeasure3 + " " + strIngreident3 + ", "
  //etc.

  // does a call to get nutrition information
  this.repositoryService.getNutrition(this.ingredients).subscribe(
    (response) => {this.nutritions = response;}
  )
}

getRecipeDetails() {
  this.repositoryService.getRecipeById(this.mealId).subscribe(
    (response) => {
      this.choiceMeal = response;
    }
  );

  this.repositoryService.getNutrition(this.ingredients).subscribe(
    (response) => {
      this.nutritions = response;
    }
  );
}

showMealDetails() {
  this.getRecipeDetails();
}



/*
ingredientsList() {
  for (let i = 1; i < 21; i++) {
    let ingredient;
    if (this.choiceMeal[`strMeasure${i}`] !== null
      && this.choiceMeal[`strMeasure${i}`] !== undefined
      && this.choiceMeal[`strIngredient${i}`] !== undefined
      && this.choiceMeal[`strIngredient${i}`] !== null) {
      ingredient = `${this.choiceMeal[`strMeasure${i}`]} ${this.choiceMeal[`strIngredient${i}`]}`;
      this.ingredients = [...this.ingredients, ingredient];
    }
  }
}
*/
}
