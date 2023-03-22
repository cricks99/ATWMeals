import { Component, Input } from '@angular/core';
import { IMealDetail } from '../interfaces/mealdetail';
import { MealRepositoryService } from '../meal-repository.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  @Input() mealId: string = "52772";
choiceMeal: IMealDetail | undefined;
ingredients: any;

constructor(private repositoryService: MealRepositoryService) {}

ngOnInit(): void {
  this.repositoryService.getRecipeById(this.mealId).subscribe(
    (response) => {this.choiceMeal = response;}
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
