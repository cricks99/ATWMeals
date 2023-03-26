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
nutritions: INutrition | any;
ingredients: string = "salt";

constructor(private repositoryService: MealRepositoryService, private route: ActivatedRoute) {}

ngOnInit(): void {
  this.mealId = this.route.snapshot.params['index'];
  this.repositoryService.getRecipeById(this.mealId).subscribe(
    (response) => {this.choiceMeal = response;}
  )

  this.repositoryService.getNutrition(this.ingredients).subscribe(
    (response) => {this.nutritions = response;}
  )
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
