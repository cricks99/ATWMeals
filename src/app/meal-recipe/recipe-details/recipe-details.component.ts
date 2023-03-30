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
ingredients: string = "salt";

constructor(private repositoryService: MealRepositoryService, private route: ActivatedRoute) {}

ngOnInit(): void {
  this.mealId = this.route.snapshot.params['mealId'];
  this.countryName = this.route.snapshot.params['countryName'];
  this.mealName = this.route.snapshot.params['mealName'];

  
  

  this.repositoryService.getRecipeById(this.mealId).subscribe(
    (response) => {this.choiceMeal = response;}
  )


  // does a call to get nutrition information
  this.repositoryService.getNutrition(this.ingredients).subscribe(
    (response) => {this.nutritions = response;}
  )
}


getIngredients(): void{
 let getingredient: string[] = [];

  getingredient.push('strIngredient1');
 
  // let getingredient: string[] = [];
  // this.getIngredients = [
  //   esponse.strIngredient1,
 
  // ]

  // for (let i = 1; i <= 20; i++) {
  //   const ingredient = response['strIngredient' + i];
  //   if (ingredient) {
  //     this.ingredients.push(ingredient);
    // }
  }
  

  //create an array of ingridents so it can be looped through. 1. in array, 2. loop through them. 3. display
  //getrecipe id but before getnutriton abouve get nution use array list. but loop through ingreds and siplay
  //create an array with 2 strings 
  //strIngredient1 and strMeasure1
    //strIngredient1 and strMeasure1
  //strIngredient1 and strMeasure1
  //strIngredient1 and strMeasure1
//etc..

//then loop through array to create a single string in this.ingredients
//this.ingredients = strMeasure1+" " + strIngreident1 + ", " +
//strmeasure2 + " " +

// an array with two strings 
// }



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
